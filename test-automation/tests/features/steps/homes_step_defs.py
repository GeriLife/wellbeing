from aloe import step

from app.homes_tasks import *


@step(r'Given the user opens the Homes page')
def user_opens_homes_page(self):
    open_homes_page()


@step(r'the homes groups are visible')
def groups_are_visible(self):
    assert is_groups_visible() == True


@step(r'the user can rename a group')
def user_renames_group(self):
    old_name = "Onnela"
    new_name = "Onnela_new"
    assert rename_group(old_name, new_name)
    assert rename_group(new_name, old_name)


@step(r'the user adds a new group')
def user_adds_group(self):
    group_name = "automation_group"
    assert add_group(group_name)


@step(r'the user add a new home to the group')
def user_adds_home(self):
    home_name = "automation_home"
    group_name = "automation_group"
    add_home(home_name, group_name)


@step(r'the group with home are visible')
def user_can_view_group_home(self):
    home_name = "automation_home"
    group_name = "automation_group"
    assert is_home_in_group(home_name, group_name)


@step(r'the user changes a home\'s name and group')
def user_can_change_home_name(self):
    old_home_name = "automation_home"
    old_group_name = "automation_group"
    new_home_name = "new_home_name"
    new_group_name = "Onnela"
    open_edit_home(old_home_name)
    edit_home(new_home_name, new_group_name)
    assert new_home_name in is_home_name()
    edit_home(old_home_name, old_group_name)
    assert old_home_name in is_home_name()


@step(r'the residents and their activities are visible')
def residents_and_activities_are_visible(self):
    assert is_residents_visible() == True
    assert is_activities_visible() == True