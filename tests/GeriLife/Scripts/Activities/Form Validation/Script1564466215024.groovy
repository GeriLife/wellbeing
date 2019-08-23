import static com.kms.katalon.core.checkpoint.CheckpointFactory.findCheckpoint
import static com.kms.katalon.core.testcase.TestCaseFactory.findTestCase
import static com.kms.katalon.core.testdata.TestDataFactory.findTestData
import static com.kms.katalon.core.testobject.ObjectRepository.findTestObject
import com.kms.katalon.core.checkpoint.Checkpoint as Checkpoint
import com.kms.katalon.core.cucumber.keyword.CucumberBuiltinKeywords as CucumberKW
import com.kms.katalon.core.mobile.keyword.MobileBuiltInKeywords as Mobile
import com.kms.katalon.core.model.FailureHandling as FailureHandling
import com.kms.katalon.core.testcase.TestCase as TestCase
import com.kms.katalon.core.testdata.TestData as TestData
import com.kms.katalon.core.testobject.TestObject as TestObject
import com.kms.katalon.core.webservice.keyword.WSBuiltInKeywords as WS
import com.kms.katalon.core.webui.keyword.WebUiBuiltInKeywords as WebUI
import internal.GlobalVariable as GlobalVariable
import com.kms.katalon.core.util.KeywordUtil as KeywordUtil

WebUI.click(findTestObject('Object Repository/Activities/Form Validation/Page_GeriLife/a_              Activities (1)'))

WebUI.click(findTestObject('Object Repository/Activities/Form Validation/Page_GeriLife/button_Add Activity (1)'))

WebUI.delay(5)

if (WebUI.verifyElementText(findTestObject('Activities/Form Validation/Page_GeriLife/h4_Activity'), 'Activity')) {
    KeywordUtil.logInfo('Text - " Activity" text is displayed')

    WebUI.takeScreenshot('~/Katalon/Activities/VActivityText')
} else {
    KeywordUtil.logInfo('Activity text is not displayed')

    WebUI.takeScreenshot('~/Katalon/Activities/INVActivityText')
}

if (WebUI.verifyElementText(findTestObject('Activities/Page_GeriLife/label_Resident(s)'), 'Resident(s)')) {
    KeywordUtil.logInfo('Text - " Resident" text is displayed')

    WebUI.takeScreenshot('~/Katalon/Activities/VResidentText')
} else {
    KeywordUtil.logInfo('Resident text is not displayed')

    WebUI.takeScreenshot('~/Katalon/Activities/INVResidentText')
}

if (WebUI.verifyElementText(findTestObject('Activities/Page_GeriLife/label_Activity type'), 'Activity type')) {
    KeywordUtil.logInfo('Text - " Activity Type" text is displayed')

    WebUI.takeScreenshot('~/Katalon/Activities/VActivityTypeText')
} else {
    KeywordUtil.logInfo('Activity Type text is not displayed')

    WebUI.takeScreenshot('~/Katalon/Activities/INVActivityTypeText')
}

if (WebUI.verifyElementText(findTestObject('Activities/Page_GeriLife/label_Activity duration (in mi'), 'Activity duration (in minutes)')) {
    KeywordUtil.logInfo('Text - " Activity duration (in minutes)" text is displayed')

    WebUI.takeScreenshot('~/Katalon/Activities/VActivityDuration')
} else {
    KeywordUtil.logInfo('Activity duration (in minutes) text is not displayed')

    WebUI.takeScreenshot('~/Katalon/Activities/INVActivityDuration')
}

if (WebUI.verifyElementText(findTestObject('Activities/Page_GeriLife/label_Activity facilitator rol'), 'Activity facilitator role')) {
    KeywordUtil.logInfo('Text - " Activity Facilitator Role" text is displayed')

    WebUI.takeScreenshot('~/Katalon/Activities/VActivityFacilitatorRole')
} else {
    KeywordUtil.logInfo('Activity Facilitator Role text is not displayed')

    WebUI.takeScreenshot('~/Katalon/Activities/INVActivityFacilitatorRole')
}

WebUI.delay(7)

WebUI.click(findTestObject('Object Repository/Activities/Form Validation/Page_GeriLife/button_Save'))

//WebUI.verifyElementText(findTestObject('Object Repository/Activities/Form Validation/Page_GeriLife/div_           Resident ids is'), 
//   'Resident ids is required in activities insert')
WebUI.click(findTestObject('Object Repository/Activities/Form Validation/Page_GeriLife/span_Select resident(s)'))

WebUI.click(findTestObject('Object Repository/Activities/Form Validation/Page_GeriLife/div_Chandler G'))

WebUI.selectOptionByValue(findTestObject('Object Repository/Activities/Form Validation/Page_GeriLife/select_Chandler G            D'), 
    'WwnYxKS8v2dJG8WZj', true)

WebUI.click(findTestObject('Object Repository/Activities/Form Validation/Page_GeriLife/button_Save'))

//
if (WebUI.verifyElementPresent(findTestObject('Object Repository/Activities/Form Validation/Page_GeriLife/div_           Activity type I'), 
    1)) {
    KeywordUtil.logInfo('Text - " Activity Type I" text is displayed')

    WebUI.takeScreenshot('~/Katalon/Activities/VActivitytypeI')
} else {
    KeywordUtil.logInfo('Activity type I text is not displayed')

    WebUI.takeScreenshot('~/Katalon/Activities/INVActivitytypeI')
}

WebUI.selectOptionByValue(findTestObject('Object Repository/Activities/Form Validation/Page_GeriLife/select_(Select One)'), 
    'HSv4gRM2RoMEtqmLE', true)

WebUI.click(findTestObject('Object Repository/Activities/Form Validation/Page_GeriLife/button_Save'))

WebUI.verifyElementPresent(findTestObject('Object Repository/Activities/Form Validation/Page_GeriLife/div_           Activity date i'), 
    0)

WebUI.delay(5)

WebUI.focus(findTestObject('Activities/Page_GeriLife/input_Activity date_activityDa'))

WebUI.executeJavaScript('$(\':input\').removeAttr(\'readonly\')', [])

WebUI.delay(5)

WebUI.setText(findTestObject('Activities/Page_GeriLife/input_Activity date_activityDa'), '2019-08-13')

WebUI.delay(5)

WebUI.click(findTestObject('Activities/Form Validation/Page_GeriLife/input_Activity duration (in mi'))

WebUI.delay(5)

WebUI.click(findTestObject('Object Repository/Activities/Form Validation/Page_GeriLife/button_Save'))

WebUI.verifyElementPresent(findTestObject('Object Repository/Activities/Form Validation/Page_GeriLife/div_           Duration is req'), 
    0)

WebUI.setText(findTestObject('Object Repository/Activities/Form Validation/Page_GeriLife/input_Activity duration (in mi'), 
    '10')

WebUI.click(findTestObject('Object Repository/Activities/Form Validation/Page_GeriLife/button_Save'))

WebUI.verifyElementPresent(findTestObject('Object Repository/Activities/Form Validation/Page_GeriLife/div_           Facilitator rol'), 
    0)

WebUI.selectOptionByValue(findTestObject('Object Repository/Activities/Form Validation/Page_GeriLife/select_(Select One)           _1'), 
    'AwXqAiJsiPWgxe53R', true)

WebUI.click(findTestObject('Object Repository/Activities/Form Validation/Page_GeriLife/button_Save'))

WebUI.closeBrowser(FailureHandling.STOP_ON_FAILURE)

