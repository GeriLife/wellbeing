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

// Clicking on Activities Page
WebUI.click(findTestObject('Page_GeriLife/a_              Activities'))

WebUI.delay(5)

// Verifying the text Activities
if (WebUI.verifyElementText(findTestObject('Activities/Page_GeriLife/h1_      Activities'), '  Activities')) {
    KeywordUtil.logInfo('Text - Activities Text is displayed')
	WebUI.takeScreenshot('~/Katalon/Activities/VAcitivitesHeading')
} else {
    KeywordUtil.logInfo('Text - Activities Text is not displayed')
	WebUI.takeScreenshot('~/Katalon/Activities/INVAcitivitesHeading')
}

WebUI.delay(5)
// Verifying the Filter Activities Text
if(WebUI.verifyMatch('Filter activities', 'Filter activities', false))
{
	KeywordUtil.logInfo('Text - Filer Activities Text is displayed')
	WebUI.takeScreenshot('~/Katalon/Activities/VFilterActivities')
}
else
{
	KeywordUtil.logInfo('Text - Filer Activities Text is not displayed')
	WebUI.takeScreenshot('~/Katalon/Activities/INVFilterActivities')
}

if(WebUI.verifyElementText(findTestObject('Activities/Page_GeriLife/label_Resident'), 'Resident'))
{
	KeywordUtil.logInfo('Text - Resident is displayed')
	WebUI.takeScreenshot('~/Katalon/Activities/VResident')
}
else
{
	KeywordUtil.logInfo('Text - Resident is not displayed')
	WebUI.takeScreenshot('~/Katalon/Activities/INVResident')
}

if(WebUI.verifyElementText(findTestObject('Activities/Page_GeriLife/label_Type'), 'Type'))
{
	KeywordUtil.logInfo('Text - Type is displayed')
	WebUI.takeScreenshot('~/Katalon/Activities/VType')
}
else
{
	KeywordUtil.logInfo('Text - Type is  not displayed')
	WebUI.takeScreenshot('~/Katalon/Activities/INVType')
}

WebUI.delay(5)

if(WebUI.verifyElementText(findTestObject('Activities/Page_GeriLife/a_Previous'), 'Previous'))
{
	KeywordUtil.logInfo('Text - Previous is displayed')
	WebUI.takeScreenshot('~/Katalon/Activities/VPrevious')
}
else
{
	KeywordUtil.logInfo('Text - Previous is  not displayed')
	WebUI.takeScreenshot('~/Katalon/Activities/INPrevious')
}

WebUI.delay(5)

if(WebUI.verifyElementText(findTestObject('Activities/Page_GeriLife/a_Next'), 'Next'))
{
	KeywordUtil.logInfo('Text - Next is displayed')
	WebUI.takeScreenshot('~/Katalon/Activities/VNext')
}
else
{
	KeywordUtil.logInfo('Text - Next is  not displayed')
	WebUI.takeScreenshot('~/Katalon/Activities/INVNext')
}

if(WebUI.verifyElementText(findTestObject('Page_GeriLife/button_Add Activity'), 'Add Activity'))
{
	KeywordUtil.logInfo('Text - Add Activity is displayed')
	WebUI.takeScreenshot('~/Katalon/Activities/VAddActivity')
}
else
{
	KeywordUtil.logInfo('Text - Add Activity is  not displayed')
	WebUI.takeScreenshot('~/Katalon/Activities/INVAddActivity')
}
WebUI.delay(5)

WebUI.click(findTestObject('Page_GeriLife/a_              Activities'))

