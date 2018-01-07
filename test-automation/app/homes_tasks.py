import time

from app.accessibility_tasks import *
# Do not remove this import. Without it the hook will not be ran
from app.hooks import with_firefox


def open_homes_page():
    find_element(homes_page).click()
    wait_for_page("homes")


def is_groups_visible():
    return find_element(homes_first_group).is_displayed()


def rename_group(old_name, new_name):
    edit_button_selector = homes_rename_first_group.replace("<group_name>", old_name)
    find_element(edit_button_selector).click()
    find_element_by_name("name").clear()
    find_element_by_name("name").send_keys(new_name)
    find_element(add_confirm).click()
    time.sleep(1)
    return is_group_exist(new_name)


# Returns True if a group with "groups_name" exists
def is_group_exist(group_name):
    for group in find_elements_by_class("panel-title"):
        if group_name in group.text:
            return True

    return False


# Returns True if "home_name" is a member of "group_name"
def is_home_in_group(home_name, group_name):
    groups = list()
    for element in find_element(".container").find_elements_by_css_selector("*"):
        if element.get_attribute("class") == "panel panel-default":
            groups.append(element)
    for group in groups:
        if group_name in group.text:
            for home in group.find_elements_by_css_selector("*"):
                if home_name in home.text:
                    return True
    return False


def add_group(group_name):
    find_element(homes_add_new).click()
    find_element(homes_add_new_group).click()
    find_element_by_name("name").send_keys(group_name)
    find_element(add_confirm).click()
    time.sleep(1)
    return is_group_exist(group_name)


def add_home(home_name, group_name):
    find_element(homes_add_new).click()
    find_element(homes_add_new_home).click()
    find_element_by_name("name").send_keys(home_name)
    Select(find_element_by_name("groupId")).select_by_visible_text(group_name)
    find_element(add_confirm).click()


def open_edit_home(home_name):
    homes = list()
    for element in find_element(".container").find_elements_by_css_selector("*"):
        if element.get_attribute("class") == "home":
            homes.append(element)
    for home in homes:
        if home_name in home.text:
            # If necessary, scrolls down to properly identify the "home_name" then click on it
            el = scroll_into_view(home)
            js_click(el)
            break
    time.sleep(3)


def edit_home(name, group):
    find_element(homes_edit_home).click()
    find_element_by_name("name").clear()
    find_element_by_name("name").send_keys(name)
    Select(find_element_by_name("groupId")).select_by_visible_text(group)
    find_element(add_confirm).click()
    time.sleep(1)


def is_home_name():
    return find_element(homes_home_name).text


def is_residents_visible():
    return find_element(homes_residents_list).is_displayed()


def is_activities_visible():
    return find_element(homes_activities_list).is_displayed()