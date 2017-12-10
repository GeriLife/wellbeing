import time

# Do not remove this import. Without it the hook will not be ran
from app.hooks import with_firefox
from app.accessibility_tasks import *
from app.selectors import *

def open_page(page):
    if page == "Settings":
        find_element(settings_menu).click()
        wait_for_page("settings")
    elif page == "Activity Types":
        find_element(activity_menu).click()
        wait_for_page("activity-types")
    elif page == "Date/Time":
        find_element(date_time_menu).click()
        wait_for_page("datetime")
    elif page == "Roles":
        find_element(roles_menu).click()
        wait_for_page("roles")
    elif page == "Users":
        find_element(users_menu).click()
        wait_for_page("users")


def is_activities_visible():
    return find_element(activity_types_table).is_displayed()


def is_roles_visible():
    # Currently the tables in Activities and Roles have the same CSS selector.
    # Leaving in a separate method for consistency
    return is_activities_visible()


def add_activity(activity_name):
    find_element(add_activity_button).click()
    # This element's class has a dynamic name
    find_element_by_name("name").send_keys(activity_name)
    find_element(add_confirm).click()


def add_role(role_name):
    find_element(add_role_button).click()
    # This element's class has a dynamic name
    find_element_by_name("name").send_keys(role_name)
    find_element(add_confirm).click()


def remove_activity(activity_name):
    rows = find_element(table_rows).find_elements_by_css_selector("*")
    for i, val in enumerate(rows):
        if val.text == activity_name:
            rows[i + 3].click()
            find_element(remove_activity_confirm).click()
            break


def remove_role(role_name):
    rows = find_element(table_rows).find_elements_by_css_selector("*")
    for i, val in enumerate(rows):
        if val.text == role_name:
            rows[i + 3].click()
            find_element(remove_activity_confirm).click()
            break


def get_time_zone():
    select_element = Select(find_element(timezome_dropdown))
    return select_element.first_selected_option.text


def change_time_zone(timezone):
    select_element = Select(find_element(timezome_dropdown))
    select_element.select_by_visible_text(timezone)
    find_element(timezome_save).click()


def create_user(user_email, user_password):
    find_element(users_add_button).click()
    find_element_by_name("email").send_keys(user_email)
    find_element_by_name("password").send_keys(user_password)
    find_element(add_confirm).click()
    time.sleep(2)


def edit_user_email(user_email, new_email):
    rows = find_element(users_rows).find_elements_by_css_selector("*")
    for i, val in enumerate(rows):
        if val.text == user_email:
            rows[i + 4].click()
            find_element_by_name("email").clear()
            find_element_by_name("email").send_keys(new_email)
            time.sleep(1)
            find_element(add_confirm).click()
            time.sleep(1)
            break


def edit_user_admin(user_email):
    rows = find_element(users_rows).find_elements_by_css_selector("*")
    for i, val in enumerate(rows):
        if val.text == user_email:
            rows[i + 4].click()
            find_element_by_name("isAdmin").click()
            time.sleep(1)
            find_element(add_confirm).click()
            time.sleep(1)
            break


def remove_user(user_email):
    rows = find_element(users_rows).find_elements_by_css_selector("*")
    for i, val in enumerate(rows):
        if val.text == user_email:
            rows[i + 7].click()
            find_element(remove_activity_confirm).click()
            break