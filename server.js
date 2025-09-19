const express = require("express");
const app = express();
const path = require("path");
const bodyParser = require("body-parser");
const { google } = require("googleapis");

// 정적 파일 서빙
app.use(express.static(path.join(__dirname, "public")));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Google Sheets 인증 설정
const auth = new google.auth.GoogleAuth({
  keyFile: "credentials.json", // 서비스 계정 키 파일
  scopes: ["https://www.googleapis.com/auth/spreadsheets"],
});

const SPREADSHEET_ID = "1hX2Opvs1gh_DTHV_h6OU4-wmeC9ltEuDZRj9DYsS6Jg"; // 시트 ID

app.post("/contact", async (req, res) => {
  const { company, name, tel, email, work, details } = req.body;

  try {
    const client = await auth.getClient();
    const sheets = google.sheets({ version: "v4", auth: client });

    await sheets.spreadsheets.values.append({
      spreadsheetId: "1hX2Opvs1gh_DTHV_h6OU4-wmeC9ltEuDZRj9DYsS6Jg",
      range: "시트1!B1",
      valueInputOption: "RAW",

      requestBody: {
        values: [
          [
            company,
            name,
            tel,
            email,
            Array.isArray(work) ? work.join(", ") : work,
            details,
          ],
        ],
      },
    });

    res.send("문의가 접수되었습니다!");
  } catch (err) {
    console.error("시트 저장 오류:", err);
    res.status(500).send("저장 실패");
  }
});

app.get("/", (요청, 응답) => {
  응답.sendFile(__dirname + "/views/index.html");
});
app.get("/more", (요청, 응답) => {
  응답.sendFile(__dirname + "/views/portpolio.html");
});
app.listen(8080, () => {
  console.log("http://localhost:8080 에서 서버 실행중");
});
