import time

from selenium.webdriver.common.keys import Keys

from app.accessibility_tasks import *
# Do not remove this import. Without it the hook will not be ran
from app.hooks import with_firefox


def open_activities_page():
    find_element(activities_page).click()
    wait_for_page("activities")


def is_activities_visible():
    return find_element(activities_table).is_displayed()


def get_number_of_results():
    return len(find_element(activities_table).find_elements_by_css_selector("*"))


def change_per_page(rows_per_page):
    find_element(per_page).clear()
    time.sleep(2)
    find_element(per_page).send_keys(rows_per_page)
    find_element(per_page).send_keys(Keys.RETURN)
    time.sleep(2)


def go_to_page(page):
    # We make sure that the page is changed by comparing the rows on the first and second page
    initial_rows = find_element(activities_table).find_elements_by_css_selector("*")
    find_element(page_number).clear()
    find_element(page_number).send_keys(page)
    find_element(page_number).send_keys(Keys.RETURN)
    time.sleep(2)
    final_rows = find_element(activities_table).find_elements_by_css_selector("*")
    return initial_rows == final_rows


'''
Filters activities. Filter has 3 possible values:
"resident" - filter by resident. The resident property is used as a key
"activity" - filter by activity. The activity property is used as a key
"resident and activity" - filters by both. resident and activity are used as a key
'''
def filter_activities(filter, resident, activity):
    residents_filter = find_element(activities_filter_by_resident)
    activities_filter = find_element(activities_filter_by_activity)
    if filter == "resident":
        residents_filter.click()
        for element in residents_filter.find_elements_by_css_selector("*"):
            if element.text == resident:
                element.click()
                break

    if filter == "activity":
        activities_filter.click()
        for element in activities_filter.find_elements_by_css_selector("*"):
            if element.text == activity:
                element.click()
                break

    if filter == "resident and activity":
        residents_filter.click()
        for element in residents_filter.find_elements_by_css_selector("*"):
            if element.text == resident:
                element.click()
                break

        activities_filter.click()
        for element in activities_filter.find_elements_by_css_selector("*"):
            if element.text == activity:
                element.click()
                break


# Returns True if "filter" is contained in every row from the table. Returns False if not
def verify_filter(filter):
    results = find_element(activities_table).find_elements_by_css_selector("*")
    for i in range(0, len(results), 9):
        if filter not in results[i].text:
            return False

    return True


def clear_filters():
    find_element(activities_clear_filters).click()


# Opens Create activity and tries to save it without providing values in any of the fields
def create_invalid_activity():
    find_element(activity_add_button).click()
    find_element(add_confirm).click()


def create_activity(resident, activity, duration, role):
    find_element(activity_add_button).click()
    residents = find_element(activities_resident_dropdown)
    activities = find_element_by_name("activityTypeId")
    activity_duration = find_element_by_name("duration")
    roles = find_element_by_name("facilitatorRoleId")

    residents.click()
    for element in residents.find_elements_by_css_selector("*"):
        if element.text == resident:
            element.click()
            find_element(".close").click()
            break

    activities.click()
    for element in activities.find_elements_by_css_selector("*"):
        if element.text == activity:
            element.click()
            break

    activity_duration.send_keys(duration)

    roles.click()
    for element in roles.find_elements_by_css_selector("*"):
        if element.text == role:
            element.click()

    find_element(add_confirm).click()
    time.sleep(5)


def check_validation():
    validations = find_elements_by_class("help-block")
    find_element(activity_cancel).click()
    time.sleep(1)
    return str(len(validations))


def delete_activity(resident, activity, duration):
    results = find_element(activities_table).find_elements_by_css_selector("tr")
    for row in results:
        row_elements = row.find_elements_by_css_selector("*")
        if (resident in row_elements[0].text) and (activity in row_elements[1].text) and (duration in row_elements[2].text):
            row_elements[5].click()
            find_element(remove_activity_confirm).click()
            break