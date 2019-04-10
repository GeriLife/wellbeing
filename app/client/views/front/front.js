Template.front.helpers({
  props() {
    return {
      Modal,
      localizedText: {
        "quickAddTitle": TAPi18n.__("front-quickAddPanel-title"),
        "activityButton": TAPi18n.__(
          "front-quickAddPanel-activityButton"
        ),
        "feelingButton": TAPi18n.__(
          "front-quickAddPanel-feelingButton"
        ),
        "linkTitle": TAPi18n.__(
          "front-quickNavigationPanel-title"
        ),
        "residentsButton": TAPi18n.__(
          "front-quickNavigationPanel-residentsButton"
        ),
        "homesButton": TAPi18n.__(
          "front-quickNavigationPanel-homesButton"
        ),
        "activitiesButton": TAPi18n.__(
          "front-quickNavigationPanel-activitiesButton"
        )
      }
    };
  }
});
