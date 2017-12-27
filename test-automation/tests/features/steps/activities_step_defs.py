from aloe import step
import logging
from app.activities_tasks import *


@step(r'the user opens the Activities page')
def user_opens_page(self):
    open_activities_page()


@step(r'the residents are visible')
def user_can_view_residents(self):
    assert is_activities_visible() == True


@step(r'the user can change the activities per roll of the page')
def user_changes_per_roll(self):
    initial_count = get_number_of_results()
    change_per_page(20)
    final_count = get_number_of_results()
    assert initial_count != final_count
    change_per_page(initial_count)


@step(r'the user can change the current activities page')
def user_can_change_page(self):
    assert go_to_page(2) == False


@step(r'the user can filter activities by \"(.*?)\"')
def user_can_filter_activities(self, filter):
    resident = "Mikko L"
    activity = "Ulkoilu"
    filter_activities(filter, resident, activity)

    if filter == "resident":
        assert verify_filter(resident)
    elif filter == "activity":
        assert verify_filter(activity)
    elif filter == "resident and activity":
        assert verify_filter(resident)
        assert verify_filter(activity)

    clear_filters()


@step(r'the user creates a \"(.*?)\" activity')
def user_creates_activity(self, type):
    residents = "Hannu L"
    activity = "Retki"
    duration = "15"
    role = "Itse"
    if type == 'invalid':
        create_invalid_activity()
        assert check_validation() == "5"
    elif type == "valid":
        create_activity(residents, activity, duration, role)


@step(r'the user deletes the activity')
def user_deletes_activity(self):
    residents = "Hannu L"
    activity = "Retki"
    duration = "15"
    delete_activity(residents, activity, duration)