package progi_project;

import java.time.Duration;
import java.util.concurrent.TimeUnit;

import org.openqa.selenium.By;
import org.openqa.selenium.Cookie;
import org.openqa.selenium.JavascriptExecutor;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.Select;
import org.openqa.selenium.support.ui.WebDriverWait;
import org.testng.annotations.BeforeClass;
import org.testng.annotations.Test;


public class StvaranjeTicketa {

    WebDriver driver;

    @BeforeClass
    public void SetUp(){
        driver = new ChromeDriver();
        driver.manage().window().maximize();
        
        driver.get("http://localhost:3000");

        Cookie accessTokenCookie = new Cookie.Builder("access_token", "ya29.a0AXeO80TrJM3pxkahTuaNSFRz5XTA5hGXpX9LQq5dpfE09Qw0c0W1r-c6J_tTNgQAF-mQ26AQ2Xd-3SFnKF0zCzrrv2TdhgmG1VZ1oeglPG4kyWOTMnyWPE_oSsukhmJnvhpKzNx9O8MF4xcCLUciXZMGK4bA4A7ayF4aCgYKAQgSARESFQHGX2Mi6P4QGmA6HJye3ZrCkzwfyw0170")
            .domain("localhost") 
            .path("/")
            .isHttpOnly(true)     
            .isSecure(false)      
            .build();
        
        driver.manage().addCookie(accessTokenCookie);
        
        driver.navigate().refresh();

        driver.get("http://localhost:3000/profile?access_token=ya29.a0AXeO80TrJM3pxkahTuaNSFRz5XTA5hGXpX9LQq5dpfE09Qw0c0W1r-c6J_tTNgQAF-mQ26AQ2Xd-3SFnKF0zCzrrv2TdhgmG1VZ1oeglPG4kyWOTMnyWPE_oSsukhmJnvhpKzNx9O8MF4xcCLUciXZMGK4bA4A7ayF4aCgYKAQgSARESFQHGX2Mi6P4QGmA6HJye3ZrCkzwfyw0170");
    }


    @Test
    public void testCreateTicketForSaleWithMusicEvent() {
        WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(10));

        WebElement newBlogButton = wait.until(ExpectedConditions.elementToBeClickable(By.className("newBlog")));

        newBlogButton.click();

        wait.until(ExpectedConditions.visibilityOfElementLocated(By.tagName("form")));

        WebElement namjenaSelect = driver.findElement(By.xpath("(//select)[1]"));
        Select dropdown = new Select(namjenaSelect);
        dropdown.selectByVisibleText("Prodaja");

        WebElement eventTypeSelect = driver.findElement(By.xpath("(//select)[2]"));
        dropdown = new Select(eventTypeSelect);
        dropdown.selectByVisibleText("Glazba");


        WebElement eventNameInput = driver.findElement(By.xpath("(//input[@type='text'])[1]"));
        eventNameInput.sendKeys("Koncert AG");

        WebElement artistNameInput = driver.findElement(By.xpath("(//input[@type='text'])[2]"));
        artistNameInput.sendKeys("Ariana Grande");

        WebElement priceInput = driver.findElement(By.xpath("(//input[@type='text'])[3]"));
        priceInput.clear();
        priceInput.sendKeys("150");

        WebElement locationInput = driver.findElement(By.xpath("(//input[@type='text'])[4]"));
        locationInput.sendKeys("Zagreb");

        WebElement eventDateInput = driver.findElement(By.xpath("//input[@type='date']"));
        eventDateInput.sendKeys("01-06-2025");

        WebElement ticketTypeInput = driver.findElement(By.xpath("(//input[@type='text'])[5]"));
        ticketTypeInput.sendKeys("VIP");

        WebElement seatNumberInput = driver.findElement(By.xpath("(//input[@type='text'])[6]"));
        seatNumberInput.sendKeys("5");

        WebElement submitButton = driver.findElement(By.xpath("//button[text()='Dodaj ulaznicu']"));
        submitButton.click();
    }

    @Test
    public void testCreateTicketForExchangeWithTheaterEvent() {
        WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(10));

        WebElement newBlogButton = wait.until(ExpectedConditions.elementToBeClickable(By.className("newBlog")));

        newBlogButton.click();

        wait.until(ExpectedConditions.visibilityOfElementLocated(By.tagName("form")));

        WebElement namjenaSelect = driver.findElement(By.xpath("(//select)[1]"));
        Select dropdown = new Select(namjenaSelect);
        dropdown.selectByVisibleText("Razmjena");

        WebElement eventTypeSelect = driver.findElement(By.xpath("(//select)[2]"));
        dropdown = new Select(eventTypeSelect);
        dropdown.selectByVisibleText("Kazaliste");

        WebElement eventNameInput = driver.findElement(By.xpath("(//input[@type='text'])[1]"));
        eventNameInput.sendKeys("Shakespeare Play");

        WebElement locationInput = driver.findElement(By.xpath("(//input[@type='text'])[2]"));
        locationInput.sendKeys("London");

        WebElement eventDateInput = driver.findElement(By.xpath("(//input[@type='date'])[1]"));
        eventDateInput.sendKeys("15-07-2025");

        WebElement ticketTypeInput = driver.findElement(By.xpath("(//input[@type='text'])[3]"));
        ticketTypeInput.sendKeys("Standard");

        WebElement seatNumberInput = driver.findElement(By.xpath("(//input[@type='text'])[4]"));
        seatNumberInput.sendKeys("5");

        WebElement wantedEventNameInput = driver.findElement(By.xpath("(//input[@type='text'])[5]"));
        wantedEventNameInput.sendKeys("Test Exchange Event");

        WebElement wantedLocationInput = driver.findElement(By.xpath("(//input[@type='text'])[6]"));
        wantedLocationInput.sendKeys("Zagreb");

        WebElement wantedDateInput = driver.findElement(By.xpath("(//input[@type='date'])[2]"));
        wantedDateInput.sendKeys("01-10-2025");

        WebElement wantedSeatNumberInput = driver.findElement(By.xpath("(//input[@type='text'])[7]"));
        wantedSeatNumberInput.sendKeys("5");

        WebElement wantedTicketTypeInput = driver.findElement(By.xpath("(//input[@type='text'])[8]"));
        wantedTicketTypeInput.sendKeys("VIP");

        WebElement submitButton = driver.findElement(By.xpath("//button[text()='Dodaj ulaznicu']"));
        submitButton.click();
    }

    @Test
    public void testCreateTicketForAuctionWithSoccerEvent() {
        WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(10));

        WebElement newBlogButton = wait.until(ExpectedConditions.elementToBeClickable(By.className("newBlog")));

        newBlogButton.click();

        wait.until(ExpectedConditions.visibilityOfElementLocated(By.tagName("form")));

        WebElement namjenaSelect = driver.findElement(By.xpath("(//select)[1]"));
        Select dropdown = new Select(namjenaSelect);
        dropdown.selectByVisibleText("Aukcija");

        WebElement eventTypeSelect = driver.findElement(By.xpath("(//select)[2]"));
        dropdown = new Select(eventTypeSelect);
        dropdown.selectByVisibleText("Nogomet");

        WebElement eventNameInput = driver.findElement(By.xpath("(//input[@type='text'])[1]"));
        eventNameInput.sendKeys("Dinamo vs Hajduk");

        WebElement priceInput = driver.findElement(By.xpath("(//input[@type='text'])[2]"));
        priceInput.sendKeys("5");

        WebElement eventDurationDateInput = driver.findElement(By.xpath("(//input[@type='date'])[1]"));
        eventDurationDateInput.sendKeys("09-09-2025");

        WebElement locationInput = driver.findElement(By.xpath("(//input[@type='text'])[3]"));
        locationInput.sendKeys("Zagreb");

        WebElement eventDateInput = driver.findElement(By.xpath("(//input[@type='date'])[2]"));
        eventDateInput.sendKeys("12-04-2025");

        WebElement ticketTypeInput = driver.findElement(By.xpath("(//input[@type='text'])[4]"));
        ticketTypeInput.sendKeys("Standard");

        WebElement submitButton = driver.findElement(By.xpath("//button[text()='Dodaj ulaznicu']"));
        submitButton.click();
    }

    @Test
    public void testCreateTicketForAuctionWithSoccerEventErrorNoName() {
        WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(10));

        WebElement newBlogButton = wait.until(ExpectedConditions.elementToBeClickable(By.className("newBlog")));

        newBlogButton.click();

        wait.until(ExpectedConditions.visibilityOfElementLocated(By.tagName("form")));

        WebElement namjenaSelect = driver.findElement(By.xpath("(//select)[1]"));
        Select dropdown = new Select(namjenaSelect);
        dropdown.selectByVisibleText("Aukcija");

        WebElement eventTypeSelect = driver.findElement(By.xpath("(//select)[2]"));
        dropdown = new Select(eventTypeSelect);
        dropdown.selectByVisibleText("Nogomet");

        WebElement eventNameInput = driver.findElement(By.xpath("(//input[@type='text'])[1]"));
        eventNameInput.sendKeys("");

        WebElement priceInput = driver.findElement(By.xpath("(//input[@type='text'])[2]"));
        priceInput.sendKeys("5");

        WebElement eventDurationDateInput = driver.findElement(By.xpath("(//input[@type='date'])[1]"));
        eventDurationDateInput.sendKeys("09-09-2025");

        WebElement locationInput = driver.findElement(By.xpath("(//input[@type='text'])[3]"));
        locationInput.sendKeys("Stadium");

        WebElement eventDateInput = driver.findElement(By.xpath("(//input[@type='date'])[2]"));
        eventDateInput.sendKeys("12-04-2025");

        WebElement ticketTypeInput = driver.findElement(By.xpath("(//input[@type='text'])[4]"));
        ticketTypeInput.sendKeys("Standard");

        WebElement submitButton = driver.findElement(By.xpath("//button[text()='Dodaj ulaznicu']"));
        submitButton.click();
    }

    @Test
    public void testCreateTicketForSaleWithMusicEventErrorPrice() {
        WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(10));

        WebElement newBlogButton = wait.until(ExpectedConditions.elementToBeClickable(By.className("newBlog")));

        newBlogButton.click();

        wait.until(ExpectedConditions.visibilityOfElementLocated(By.tagName("form")));

        WebElement namjenaSelect = driver.findElement(By.xpath("(//select)[1]"));
        Select dropdown = new Select(namjenaSelect);
        dropdown.selectByVisibleText("Prodaja");

        WebElement eventTypeSelect = driver.findElement(By.xpath("(//select)[2]"));
        dropdown = new Select(eventTypeSelect);
        dropdown.selectByVisibleText("Glazba");

        WebElement eventNameInput = driver.findElement(By.xpath("(//input[@type='text'])[1]"));
        eventNameInput.sendKeys("Koncert AG");

        WebElement artistNameInput = driver.findElement(By.xpath("(//input[@type='text'])[2]"));
        artistNameInput.sendKeys("Ariana Grande");

        WebElement priceInput = driver.findElement(By.xpath("(//input[@type='text'])[3]"));
        priceInput.clear();
        priceInput.sendKeys("da");

        WebElement locationInput = driver.findElement(By.xpath("(//input[@type='text'])[4]"));
        locationInput.sendKeys("Zagreb");

        WebElement eventDateInput = driver.findElement(By.xpath("//input[@type='date']"));
        eventDateInput.sendKeys("01-06-2025");

        WebElement ticketTypeInput = driver.findElement(By.xpath("(//input[@type='text'])[5]"));
        ticketTypeInput.sendKeys("VIP");

        WebElement seatNumberInput = driver.findElement(By.xpath("(//input[@type='text'])[6]"));
        seatNumberInput.sendKeys("5");

        WebElement submitButton = driver.findElement(By.xpath("//button[text()='Dodaj ulaznicu']"));
        submitButton.click();
    }

    @Test
    public void testCreateTicketForSaleWithMusicEventErrorArtistName() {
        WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(10));

        WebElement newBlogButton = wait.until(ExpectedConditions.elementToBeClickable(By.className("newBlog")));

        newBlogButton.click();

        wait.until(ExpectedConditions.visibilityOfElementLocated(By.tagName("form")));

        WebElement namjenaSelect = driver.findElement(By.xpath("(//select)[1]"));
        Select dropdown = new Select(namjenaSelect);
        dropdown.selectByVisibleText("Prodaja");

        WebElement eventTypeSelect = driver.findElement(By.xpath("(//select)[2]"));
        dropdown = new Select(eventTypeSelect);
        dropdown.selectByVisibleText("Glazba");

        WebElement eventNameInput = driver.findElement(By.xpath("(//input[@type='text'])[1]"));
        eventNameInput.sendKeys("Koncert AG");

        WebElement artistNameInput = driver.findElement(By.xpath("(//input[@type='text'])[2]"));
        artistNameInput.sendKeys("");

        WebElement priceInput = driver.findElement(By.xpath("(//input[@type='text'])[3]"));
        priceInput.clear();
        priceInput.sendKeys("10");

        WebElement locationInput = driver.findElement(By.xpath("(//input[@type='text'])[4]"));
        locationInput.sendKeys("Zagreb");

        WebElement eventDateInput = driver.findElement(By.xpath("//input[@type='date']"));
        eventDateInput.sendKeys("01-06-2025");

        WebElement ticketTypeInput = driver.findElement(By.xpath("(//input[@type='text'])[5]"));
        ticketTypeInput.sendKeys("VIP");

        WebElement seatNumberInput = driver.findElement(By.xpath("(//input[@type='text'])[6]"));
        seatNumberInput.sendKeys("5");

        WebElement submitButton = driver.findElement(By.xpath("//button[text()='Dodaj ulaznicu']"));
        submitButton.click();
    }
    
}

