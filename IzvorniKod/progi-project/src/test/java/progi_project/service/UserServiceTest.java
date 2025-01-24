package progi_project.service;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertTrue;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;
import org.mockito.junit.jupiter.MockitoExtension;

import progi_project.model.Rate;
import progi_project.model.RateId;
import progi_project.model.User;
import progi_project.repository.RateRepository;
import progi_project.repository.UserRepository;

@ExtendWith(MockitoExtension.class)
public class UserServiceTest {

    @Mock
    private UserRepository userRepository;

    @Mock
    private RateRepository rateRepository;

    @InjectMocks
    private UserService userService; // Ovu komponentu testiramo

    @Test
    public void testEmailExists_ValidEmail() {

        String email = "anaanic143@gmail.com";
        when(userRepository.existsByEmail(email)).thenReturn(true);

        boolean result = userService.emailExists(email);

        assertTrue(result);
        verify(userRepository, times(1)).existsByEmail(email);
    }

    @Test
    public void testEmailExists_InvalidEmail() {

        String email = "peroperic@gmail.com";
        when(userRepository.existsByEmail(email)).thenReturn(false);

        boolean result = userService.emailExists(email);

        assertFalse(result);
        verify(userRepository, times(1)).existsByEmail(email);
    }

    @Test
    public void testEmailExists_EmailIsNull() {

        String email = null;
        when(userRepository.existsByEmail(email)).thenReturn(false);

        boolean result = userService.emailExists(email);

        assertFalse(result);
        verify(userRepository, times(1)).existsByEmail(email);
    }

    @Test
    public void testEmailExists_EmailIsEmpty() {

        String email = "";
        when(userRepository.existsByEmail(email)).thenReturn(false);

        boolean result = userService.emailExists(email);

        assertFalse(result);
        verify(userRepository, times(1)).existsByEmail(email);
    }

    @Test
    public void testCanRateUser_NoExistingRate() {
        User buyer = new User();
        buyer.setId(1);
        User owner = new User();
        owner.setId(2);
        when(rateRepository.findById(new RateId(buyer.getId(), owner.getId()))).thenReturn(Optional.empty());

        assertTrue(userService.canRateUser(buyer, owner));
    }

    @Test
    public void testCanRateUser_ExistingRate() {
        User buyer = new User();
        buyer.setId(1);
        User owner = new User();
        owner.setId(2);
        when(rateRepository.findById(new RateId(buyer.getId(), owner.getId()))).thenReturn(Optional.of(new Rate()));

        assertFalse(userService.canRateUser(buyer, owner));
    }
}
