from aloe import step

from app.accessibility_tasks import *
from selenium.webdriver.remote.remote_connection import LOGGER


@step(r'the user opens GeriLife index page')
def user_logs_in(self):
    # Open index page
    go_to_index()


@step(r'the current language is \"(.*?)\"')
def verify_language(self, language):
    current_language = get_language()
    assert current_language == language


@step(r'the user changes the language to \"(.*?)\"')
def user_changes_language(self, desired_language):
    change_language(desired_language)


@step(r'the user logs out')
def user_logs_out(self):
    logout()