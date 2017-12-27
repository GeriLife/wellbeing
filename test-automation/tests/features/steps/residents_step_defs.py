import time
from aloe import step

from app.residents_tasks import *


@step(r'the user opens the Residents page')
def user_opens_page(self):
    open_residents_page()


@step(r'the residents are visible')
def user_can_view_residents(self):
    assert is_residents_visible() == True


@step(r"the user searches for a resident by \"(.*?)\"")
def user_searches_for_resident(self, mode):
    if mode == "name":
        assert search_for(mode, "Aava E") == True
    elif mode == "home":
        assert search_for(mode, "Lehmus") == True


@step(r'the user can change the residents per roll of the page')
def user_changes_per_roll(self):
    initial_count = get_number_of_results()
    change_per_page(5)
    final_count = get_number_of_results()
    assert initial_count != final_count
    change_per_page(initial_count)


@step(r'the user can change the current residents page')
def user_can_change_page(self):
    assert go_to_page(2) == False


@step(r'the user adds a new( departed)? resident')
def user_adds_resident(self, nullify):
    first_name = "test_first_name"
    last_name = "test_last_name"
    home = "Usko"
    if nullify:
        add_resident(first_name, last_name, home, True)
    else:
        add_resident(first_name, last_name, home, False)