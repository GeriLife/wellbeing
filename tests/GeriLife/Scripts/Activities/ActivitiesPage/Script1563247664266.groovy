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

// Opening the Activities Page
String expectedURL = 'http://localhost:3000/activities'
String expectedTitleWindow = 'GeriLife'

WebUI.click(findTestObject('Page_GeriLife/a_              Activities'))

// Verifying correct Activities Page is opened and captures screenshot
if (expectedURL == WebUI.getUrl()) {
    KeywordUtil.logInfo('Correct URL is opened for Activites')
	WebUI.takeScreenshot('~/Katalon/Activities/VAcitivitesPage')
} else {
    KeywordUtil.logInfo('Incorrect URL is opened for Activities')
	WebUI.takeScreenshot('~/Katalon/Activities/INVAcitivitesPage')
}

//Verfiying the Title of the page
if (expectedTitleWindow == WebUI.getWindowTitle())
{
	KeywordUtil.logInfo('Correct Title of the page is displayed')
	WebUI.takeScreenshot('~/Katalon/Activities/VTitleofPage')
}
else
{
	KeywordUtil.logInfo('INcorrect Title of the page is displayed')
	WebUI.takeScreenshot('~/Katalon/Activities/INVTitleofPage')
}