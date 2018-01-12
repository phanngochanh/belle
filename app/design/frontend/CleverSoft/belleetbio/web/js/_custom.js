jQuery(document).ready(function(e) {
    e(".menu-action-wrap").length && (e(".action-trigger", ".menu-action-wrap").on("click", function () {
        e(this).parent().find(".menu-action-dropdown").addClass("active"), e("body").addClass("menu-action-active")
    }), e(".menu-action-wrap .menu-action-close").on("click", function () {
        e(this).closest(".menu-action-dropdown").removeClass("active"), e("body").removeClass("menu-action-active")
    })), e(".action-mask-close").on("click", function (t) {
        t.preventDefault(), e("body").toggleClass("menu-action-active")
    })
})