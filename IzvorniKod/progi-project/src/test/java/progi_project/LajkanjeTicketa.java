package progi_project;

import java.time.Duration;
import java.util.List;
import java.util.NoSuchElementException;
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


public class LajkanjeTicketa {

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
    public void testCreateTicketForSaleWithMusicEvent() {
        WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(10));

        WebElement navigationMenu = wait.until(ExpectedConditions.visibilityOfElementLocated(By.className("navigation-menu")));

        WebElement fourthListItem = navigationMenu.findElements(By.tagName("li")).get(3);

        WebElement buttonInFourthLi = fourthListItem.findElement(By.tagName("button"));
        buttonInFourthLi.click();


        WebElement card = wait.until(ExpectedConditions.visibilityOfElementLocated(By.className("card")));
        card.click();

        WebElement like = wait.until(ExpectedConditions.elementToBeClickable(By.className("like")));
        like.click();

        driver.get("http://localhost:3000/profile?access_token=ya29.a0AXeO80RwaUd_QhnWPeS5uKyGI7gYLlSDCu1CRDUiFmZZ-Zqglp1EjxGOzRJKdO3W-_thHUjNJ3ZC6sYBUnQv78kLyc93RZPt6LQE7j06r4IIYcMskX7ug2h9W_ZFJHVuaVml2xJHSxIAbTylw61PQ_NGldbC-n5qqQZ7aWg6aCgYKAagSARESFQHGX2MiU6kgLBNipfWmgdM3lG8uhA0175");

        WebElement categoriesDiv = wait.until(ExpectedConditions.elementToBeClickable(By.className("categories")));

        List<WebElement> buttons = categoriesDiv.findElements(By.tagName("button"));

        buttons.get(6).click();

        WebElement ticketsDiv = driver.findElement(By.className("tickets"));

        try {
            WebElement ticketsPreviewDiv = ticketsDiv.findElement(By.className("ticket-preview"));
            ticketsPreviewDiv.click();
        } catch (NoSuchElementException e) {
            System.out.println("No 'tickets-preview' div found inside 'tickets'.");
        }

        
    }

}





