from aloe import world
from selenium.webdriver.common.by import By
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.support.select import Select
from selenium.webdriver.support.wait import WebDriverWait

# Do not remove this import. Without it the hook will not be ran
from app.hooks import with_firefox
from app.selectors import *

# The time the WebDriver will wait for various openstions- find element, wait for page, expected conditions
webDriverWaitInSeconds = 5

# Tries to go to the index page. If the user is not logged in, the methods logs in
def go_to_index():
    user_name = "demo@geri.life"
    password = "demo123"

    world.browser.get(geri_life_url)

    #TODO wait for page to load
    try:
        find_element(username_field).send_keys(user_name)
        find_element(password_field).send_keys(password)
        find_element(login_button).click()
    except:
        pass

    find_element("ul.nav:nth-child(1) > li:nth-child(1) > a:nth-child(1)")


def get_language():
    select_element = Select(find_element(language_dropdown))
    return select_element.first_selected_option.text


def change_language(desired_language):
    select_element = Select(find_element(language_dropdown))
    select_element.select_by_visible_text(desired_language)


def logout():
    find_element(logout_button).click()


# Returns a list of WebElement found by a CSS Selector
def find_elements(selector):
    return world.browser.find_elements_by_css_selector(selector)


# Returns a list of WebElement found by Class name
def find_elements_by_class(selector):
    return world.browser.find_elements_by_class_name(selector)


# Returns a single WebElement found by a CSS Selector
def find_element(selector):
    element = WebDriverWait(world.browser, webDriverWaitInSeconds).until(
        EC.element_to_be_clickable((By.CSS_SELECTOR, selector)))
    return element


# Returns a single WebElement found by Name
def find_element_by_name(selector):
    element = WebDriverWait(world.browser, webDriverWaitInSeconds).until(
        EC.element_to_be_clickable((By.NAME, selector)))
    return element


# Waits for page with URL containing "url" to load
def wait_for_page(url):
    wait = WebDriverWait(world.browser, webDriverWaitInSeconds)
    wait.until(EC.url_contains(url))


# Scrolls "element" into view. Used when element is outside the field of view
def scroll_into_view(element):
    world.browser.execute_script("arguments[0].scrollIntoView();", element)
    return element


# Uses JS to click on an "element". Used when "element" is not a button or text field
# Ex. homes in the Homes page
def js_click(element):
    world.browser.execute_script("arguments[0].click();", element);