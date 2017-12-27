
import time

from selenium.webdriver.common.keys import Keys

from app.accessibility_tasks import *
# Do not remove this import. Without it the hook will not be ran
from app.hooks import with_firefox


def open_residents_page():
    find_element(residents_page).click()
    wait_for_page("residents")


def is_residents_visible():
    return find_element(residents_table).is_displayed()


'''
Search for name or home. "mode" can be:
"name" for name based searches
"home" for home based searches
Returns False if no results are found
'''
def search_for(mode, search_string):
    world.browser.refresh()
    if mode == "name":
        find_element(residents_search_name).send_keys(search_string)
    elif mode == "home":
        find_element(residents_search_home).send_keys(search_string)

    time.sleep(1)
    rows = find_element(residents_table).find_elements_by_css_selector("*")
    for row in rows:
        if row.text == search_string:
            return row.is_displayed()

    return False


def get_number_of_results():
    return len(find_element(residents_table).find_elements_by_css_selector("*"))


def change_per_page(rows_per_page):
    find_element(per_page).clear()
    find_element(per_page).send_keys(rows_per_page)
    find_element(per_page).send_keys(Keys.RETURN)


def go_to_page(page):
    # We make sure that the page is changed by comparing the rows on the first and second page
    initial_rows = find_element(residents_table).find_elements_by_css_selector("*")
    find_element(page_number).clear()
    find_element(page_number).send_keys(page)
    find_element(page_number).send_keys(Keys.RETURN)
    final_rows = find_element(residents_table).find_elements_by_css_selector("*")
    return initial_rows == final_rows


def add_resident(first_name, last_name, home, departed):
    find_element(residents_add).click()
    find_element_by_name("firstName").send_keys(first_name)
    find_element_by_name("lastInitial").send_keys(last_name)
    home_select = Select(find_element_by_name("homeId"))
    home_select.select_by_visible_text(home)
    if departed:
        find_element_by_name("departed").click()
    #TODO find out how to delete users and then press the button
    find_element(add_confirm).click()
    time.sleep(1)