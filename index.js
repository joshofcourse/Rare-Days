$('.work_item').on('mouseenter', function() {
  gsap.to($(this).find(".work_hover-wrap"), {
    opacity: 1,
    duration: 0
});
});

$('.work_item').on('mouseleave', function() {
  gsap.to($(this).find(".work_hover-wrap"), {
    opacity: 0,
    duration: 0
});
});



$(document).ready(sizzleScroll);
$(document).ready(heroDiamondScroll);


// #region Newsletter Reveal
/*
function footerPara() {
  $(".contents_wrapper").each(function (index) {
    let page = $(this);
    let footer = $(".newsletter_section");

    let footerPara = gsap.timeline({
      scrollTrigger: {
        trigger: page,
        start: "bottom bottom",
        end: "bottom top",
        scrub: 0 
      },
    });

    footerPara.from($(footer), {
      y: "-20svh"
      
    });
  });
} */
// #endregion

// #region Sizzle Reel Sroll
function sizzleScroll() {
  $(".home_showreel").each(function () {
    let sizzleOuter = this; // Raw DOM element
    let sizzleInner = sizzleOuter.querySelector(".showreel_bg"); // DOM query

    let sizzleScroll = gsap.timeline({
      scrollTrigger: {
        trigger: sizzleOuter,
        start: "top bottom",
        end: "bottom bottom",
        scrub: true,
      },
    });

    sizzleScroll.fromTo(
      sizzleOuter,
      { width: "50%" },
      { width: "100%", ease: "none" }
    );
    sizzleScroll.fromTo(
      sizzleInner,
      { scale: 2 },
      { scale: 1, ease: "none" },
      "<"
    );
  });
}

// #endregion

// #region Hero Diamond Parallax

function heroDiamondScroll() {
  $(".home_hero").each(function () {
    let heroDiamondOuter = this; // Raw DOM element
    let heroDiamondInner = heroDiamondOuter.querySelector(".diamond_spline-hero"); // Scoped selection

    if (heroDiamondInner) { // Ensure the inner element exists
      let heroDiamondScroll = gsap.timeline({
        scrollTrigger: {
          trigger: heroDiamondOuter,
          start: "top top",
          end: "bottom bottom",
          scrub: 0.75,
        },
      });

      heroDiamondScroll.to(heroDiamondInner, { 
        y: "150vh", 
        ease: "none" 
      });
    }
  });
}


// #endregion

// #region Page Transition
$(document).ready(function () {
// Code that runs on pageload
gsap.to(".load_grid-item", {
  height: "0%",
  duration: 0.75,
  delay: 0.25,
  ease: "power4.out",
  stagger: { amount: 0.5, from: "start" }
});
gsap.to(".load_grid-item-behind", {
  height: "0%",
  duration: 0.75,
  delay: 0.25,
  ease: "power4.out",
  stagger: { amount: 0.5, from: "start" },
  onComplete: () => {
    gsap.set(".loader_wrapper", { display: "none" });
  }
});
});


// Code that runs on click of a link
$(document).ready(function () {
  $("a").on("click", function (e) {
    if (
    	$(this).prop("hostname") === window.location.host &&
      $(this).attr("href").indexOf("#") === -1 &&
      $(this).attr("target") !== "_blank") {
        e.preventDefault();
        let destination = $(this).attr("href");
        gsap.set(".loader_wrapper", { display: "block" });
        gsap.fromTo(
          ".load_grid-item",
          {
            height: "0%"
          },
          {
            height: "100%",
            duration: 0.5,
            ease: "power4.in",
            stagger: { amount: 0.5, from: "start" }, //you can also try a from: "start" or "end" -- get creative!
            onComplete: () => {
              window.location = destination;
            }
          }
        );
    }
  });
  
  // On click of the back button
  window.onpageshow = function(event){
  	if (event.persisted) {
    	window.location.reload();
    }
  }
});

// #endregion

// #region Full Width Text 

window.addEventListener('DOMContentLoaded', (event) => {
  adjustTextSize();

  window.addEventListener('resize', () => {
      adjustTextSize();
  });
});

function adjustTextSize() {
  // Assuming the elements have the class 'dynamic-container' and 'dynamic-text'
  const dynamicContainers = document.querySelectorAll("[dynamic-text='wrapper']");
  const dynamicTexts = document.querySelectorAll("[dynamic-text='text']");

  dynamicContainers.forEach((dynamicContainer, index) => {
      const containerWidth = dynamicContainer.offsetWidth;
      const dynamicTextWidth = dynamicTexts[index].offsetWidth;

      const fontSize = (containerWidth / dynamicTextWidth) * parseFloat(window.getComputedStyle(dynamicTexts[index]).fontSize);

      dynamicTexts[index].style.fontSize = fontSize + 'px';
  });
}

// #endregion

// #region Work Grid / List View
/*
$(document).ready(function() {
  $('.work_view-type').on('click', function(e) {
    e.preventDefault(); 

    var workList = $('.work_list');
    var workItem = $('.work_item');
    var workMedia =$(".work_media");
    var workTitles =$(".work_titles");
    var workHoverWrap =$(".work_hover-wrap");
    var workMediaInner =$(".work_media-inner");
    var workHoverTop =$(".work_hover-top");
    var workHoverCapab =$(".work_hover-capab");
    var workHoverDescription =$(".work_hover-description");
    var workCapabList =$(".work_capab_list");
    var category =$(".work_item .category.on-dark");
    var descriptionBody =$(".work_item .body-m");
    var largeButton =$(".work_item .button_large-outer.is-light");
    var largeImage =$(".work_hover-image");
    var smallButton =$(".work_item .work_list-button");
    var smallButtonInner =$(".work_item .button_case-outer");
    var videoEmbed =$(".video_embed-100");
    var thumbImage =$(".work_thumb-image");
    var workMediaVideo =$(".work_media-video");

    gsap.to(workHoverWrap, {
      opacity: 1,
      duration: 0
    });

    // Fade out
    gsap.to(workItem, {
      duration: 0.25, 
      opacity: 0,
      onComplete: function() {
        // Toggle the classes for the transition
        workList.toggleClass('is-list');
        workItem.toggleClass('is-list');
        workMedia.toggleClass('is-list');
        workTitles.toggleClass('is-list');
        workHoverWrap.toggleClass('is-list');
        workMediaInner.toggleClass('is-list');
        workHoverTop.toggleClass('is-list');
        workHoverCapab.toggleClass('is-list');
        workHoverDescription.toggleClass('is-list');
        workCapabList.toggleClass('is-list');
        category.toggleClass('is-list');
        descriptionBody.toggleClass('is-list');
        largeButton.toggleClass('is-list');
        largeImage.toggleClass('is-list');
        smallButton.toggleClass('is-list');
        smallButtonInner.toggleClass('is-list')
        videoEmbed.toggleClass('is-list');
        thumbImage.toggleClass('is-list');
        workMediaVideo.toggleClass('is-list');

        // Fade back in 
        gsap.to(workItem, {
          duration: 0.25, 
          opacity: 1
        });
      }
    });
  });
});
*/

//#endregion
