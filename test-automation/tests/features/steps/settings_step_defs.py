from aloe import step
from app.settings_tasks import *

@step(r'the user opens the \"(.*?)\" page')
def user_opens_page(self, page):
    open_page(page)


@step(r'the activities are visible')
def user_views_activities(self):
    assert is_activities_visible() == True


@step(r"the user can \"(.*?)\" an activity type")
def user_add_remove_activity_type(self, action):
    if action == "add":
        add_activity("automation_test_activity")
    elif action == "remove":
        remove_activity("automation_test_activity")


@step(r'the user can change the time zone')
def user_can_change_timezone(self):
    test_timezone = "(GMT -10:00) US/Aleutian"
    initial_timezone = get_time_zone()
    change_time_zone(test_timezone)
    assert get_time_zone() == test_timezone
    change_time_zone(initial_timezone)


@step(r'the roles are visible')
def user_views_activities(self):
    assert is_roles_visible() == True


@step(r"the user can \"(.*?)\" a role")
def user_add_remove_role(self, action):
    if action == "add":
        add_role("settings_automation_test_activity")
    elif action == "remove":
        # Currently there is no option to remove a role
        remove_role("settings_automation_test_activity")


@step(r'the user creates a new user')
def user_creates_user(action):
    user_email = "test1user@gmail.com"
    user_password = "testpass"
    create_user(user_email, user_password)


@step(r'the user can change the user\'s email')
def user_changes_users_email(self):
    user_email_old = "test1user@gmail.com"
    user_email_new = "test1userNew@gmail.com"
    edit_user_email(user_email_old, user_email_new)


@step(r'the user can make the new user an admin')
def user_changes_users_email(self):
    user_email_old = "test1userNew@gmail.com"
    edit_user_admin(user_email_old)


@step(r'the user can remove the new user')
def user_deletes_users(self):
    user_email_old = "test1userNew@gmail.com"
    remove_user(user_email_old)