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


public class UrediProfil {

    WebDriver driver;

    @BeforeClass
    public void SetUp(){
        driver = new ChromeDriver();
        driver.manage().window().maximize();
        
        driver.get("http://localhost:3000");

        Cookie accessTokenCookie = new Cookie.Builder("access_token", "ya29.a0AXeO80RwaUd_QhnWPeS5uKyGI7gYLlSDCu1CRDUiFmZZ-Zqglp1EjxGOzRJKdO3W-_thHUjNJ3ZC6sYBUnQv78kLyc93RZPt6LQE7j06r4IIYcMskX7ug2h9W_ZFJHVuaVml2xJHSxIAbTylw61PQ_NGldbC-n5qqQZ7aWg6aCgYKAagSARESFQHGX2MiU6kgLBNipfWmgdM3lG8uhA0175")
            .domain("localhost") 
            .path("/")
            .isHttpOnly(true)     
            .isSecure(false)      
            .build();
        
        driver.manage().addCookie(accessTokenCookie);
        
        driver.navigate().refresh();

        driver.get("http://localhost:3000/profile?access_token=ya29.a0AXeO80RwaUd_QhnWPeS5uKyGI7gYLlSDCu1CRDUiFmZZ-Zqglp1EjxGOzRJKdO3W-_thHUjNJ3ZC6sYBUnQv78kLyc93RZPt6LQE7j06r4IIYcMskX7ug2h9W_ZFJHVuaVml2xJHSxIAbTylw61PQ_NGldbC-n5qqQZ7aWg6aCgYKAagSARESFQHGX2MiU6kgLBNipfWmgdM3lG8uhA0175");
    }


    @Test
    public void ChangeName() {
        WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(10));

        WebElement editButton = wait.until(ExpectedConditions.elementToBeClickable(By.xpath("//button[text()='Uredi podatke!']")));
        editButton.click();

        wait.until(ExpectedConditions.visibilityOfElementLocated(By.className("popup-content")));

        WebElement firstNameInput = driver.findElement(By.xpath("//input[@placeholder='Ime']"));
        firstNameInput.clear();
        firstNameInput.sendKeys("NovoIme");

        WebElement lastNameInput = driver.findElement(By.xpath("//input[@placeholder='Prezime']"));
        lastNameInput.clear(); 
        lastNameInput.sendKeys("NovoPrezime"); 

        WebElement popupButtonsDiv = driver.findElement(By.className("popup-buttons"));

        WebElement firstButton = popupButtonsDiv.findElement(By.tagName("button"));

        firstButton.click();

        
    }

    @Test
    public void ChangePreference() {
        WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(10));

        WebElement editButton = wait.until(ExpectedConditions.elementToBeClickable(By.xpath("//button[text()='Uredi podatke!']")));
        editButton.click();

        wait.until(ExpectedConditions.visibilityOfElementLocated(By.className("popup-content")));

        WebElement checkbox = driver.findElement(By.id("checkbox-0"));

        checkbox.click();

        WebElement popupButtonsDiv = driver.findElement(By.className("popup-buttons"));

        WebElement firstButton = popupButtonsDiv.findElement(By.tagName("button"));

        firstButton.click();

        
    }

    @Test
    public void ChangeNameErrorEmptyName() {
        WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(10));

        WebElement editButton = wait.until(ExpectedConditions.elementToBeClickable(By.xpath("//button[text()='Uredi podatke!']")));
        editButton.click();

        wait.until(ExpectedConditions.visibilityOfElementLocated(By.className("popup-content")));

        WebElement firstNameInput = driver.findElement(By.xpath("//input[@placeholder='Ime']"));
        firstNameInput.clear();
        firstNameInput.sendKeys("");

        WebElement lastNameInput = driver.findElement(By.xpath("//input[@placeholder='Prezime']"));
        lastNameInput.clear(); 
        lastNameInput.sendKeys("NovoPrezime"); 

        WebElement popupButtonsDiv = driver.findElement(By.className("popup-buttons"));

        WebElement firstButton = popupButtonsDiv.findElement(By.tagName("button"));

        firstButton.click();

        
    }

    
}

