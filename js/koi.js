$(document).ready(function () {
  // 프로젝트별 이미지 목록
  const projectImages = {
    "white-gym": ["img/white-1.jpg", "img/white-2.jpg", "img/white-3.jpg"],
    keychron: [
      "img/test-photo-1/ETK_9747.jpg",
      "img/test-photo-1/ETK_9748.jpg",
      "img/test-photo-1/ETK_9749.jpg",
    ],
  };

  // 이미지 클릭 시 캐러셀 생성
  $(".project-img").on("click", function () {
    const projectKey = $(this).data("project");
    const images = projectImages[projectKey];

    let carouselHTML = `
  <div class="carousel-overlay">
    <div class="more-carousel">
      <div class="close-btu">
        <i class="fa-solid fa-x" style="font-size: 30px; cursor: pointer;"></i>
      </div>
      <div id="carouselExample" class="carousel slide" data-bs-ride="carousel">
        <div class="carousel-inner">
`;

    $.each(images, function (i, src) {
      carouselHTML += `
    <div class="carousel-item ${i === 0 ? "active" : ""}">
      <img src="${src}" class="d-block w-100" alt="slide-${i}" />
    </div>
  `;
    });

    carouselHTML += `
        </div>
        <button class="carousel-control-prev" type="button" data-bs-target="#carouselExample" data-bs-slide="prev">
          <span class="carousel-control-prev-icon"></span>
        </button>
        <button class="carousel-control-next" type="button" data-bs-target="#carouselExample" data-bs-slide="next">
          <span class="carousel-control-next-icon"></span>
        </button>
      </div>
    </div>
  </div>
`;

    $("body").append(carouselHTML);
    new bootstrap.Carousel($("#carouselExample")[0]);

    // 닫기 버튼 또는 배경 클릭 시 제거
    $(".close-btu i, .carousel-overlay").on("click", function (e) {
      if (
        $(e.target).closest(".more-carousel").length === 0 ||
        $(e.target).is("i")
      ) {
        $(".carousel-overlay").remove();
      }
    });
  });
});

// 포트폴리오 더보기 버튼
$(".row").on("click", function () {
  $(".more-carousel").addClass("carousel-show");
});

// more 버튼을 누르면
// 숨은 나머지 이미지들이 나타남
// 사진을 클릭하면 관련된 이미지를 담은 캐러셀이 나타남

$(window).on("scroll", function () {
  if ($(this).scrollTop() > 10) {
    $(".nav-bar-2").addClass("navbar-scrolled");
  } else {
    $(".nav-bar-2").removeClass("navbar-scrolled");
  }
});
// 포트폴리오 캐러셀

// for (let i = 0; i < $(".portfolio-item").length; i++) {
//   $(".portfolio-item")
//     .eq(i)
//     .on("click", function () {
//       $(".more-carousel").addClass("carousel-show");
//     });
// }

$(".close-btu").on("click", function () {
  $(".more-carousel").removeClass("carousel-show");
});
// 관게형 > 정규화과정 거침(중복제가) - sql 등등
// 비관계형 >정규화 X 안함 속도 빠름 -monggoDB

// 문의폼 전송시 alert 창 띄움
$("form").on("submit", async (e) => {
  e.preventDefault();

  const formData = new FormData(e.target);
  const data = {
    company: formData.get("company"),
    name: formData.get("name"),
    tel: formData.get("tel"),
    email: formData.get("email"),
    work: formData.get("work[]"),
    details: formData.get("details"),
  };
  try {
    const res = await fetch("/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    const text = await res.text();
    alert(text); // ✅ 여기서 알림창으로 띄움
    e.target.reset();
  } catch (err) {
    alert("오류가 발생했습니다. 다시 시도해주세요.");
    console.error(err);
  }
});
