import os
import platform
from contextlib import contextmanager

import logging
logger = logging.getLogger('spam_application')
logger.setLevel(logging.DEBUG)
# create file handler which logs even debug messages
fh = logging.FileHandler('spam.log')
fh.setLevel(logging.DEBUG)
# create console handler with a higher log level
ch = logging.StreamHandler()
ch.setLevel(logging.ERROR)
# create formatter and add it to the handlers
formatter = logging.Formatter('%(asctime)s - %(name)s - %(levelname)s - %(message)s')
fh.setFormatter(formatter)
ch.setFormatter(formatter)
# add the handlers to the logger
logger.addHandler(fh)
logger.addHandler(ch)

from aloe import around, world
from selenium.webdriver.remote.remote_connection import LOGGER
from selenium import webdriver

'''
this method sets a global variable of type WebDriver. This is the browser.
@around.all is a global hook. It will be ran once before all scenarios
After the last scenario is completed (pass or fail) the WebDriver will be closed
'''
@around.all
@contextmanager
def with_firefox():
    real_path = os.path.realpath(__file__)
    driver_path=os.path.dirname(real_path).replace("app", "conf/geckodriver-linux")
    logger.info("%s",driver_path)


    LOGGER.setLevel(logging.WARNING)
    user_platform = platform.platform()
    if "win" in user_platform:
        driver_path = os.path.dirname(real_path).replace("app", "conf\geckodriver.exe")
    elif "linux" in user_platform:
        driver_path=os.path.dirname(real_path).replace("app", "conf/geckodriver-linux")
    elif "darwin" in user_platform:
        driver_path = os.path.dirname(real_path).replace("app", "conf\geckodriver-macos")

    world.browser = webdriver.Firefox(executable_path = driver_path)
    world.browser.maximize_window()
    yield
    world.browser.quit()
    delattr(world, 'browser')