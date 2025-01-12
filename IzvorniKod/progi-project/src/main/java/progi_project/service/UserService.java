package progi_project.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import jakarta.transaction.Transactional;
import progi_project.model.Rate;
import progi_project.model.RateId;
import progi_project.model.Report;
import progi_project.model.User;
import progi_project.repository.RateRepository;
import progi_project.repository.ReportRepository;
import progi_project.repository.UserRepository;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private RateRepository rateRepository;

    @Autowired
    private ReportRepository reportRepository;

    public boolean canRateUser(User buyer, User owner) {
        RateId rateId = new RateId(buyer.getId(), owner.getId());
        Optional<Rate> existingRate = rateRepository.findById(rateId);
        return !existingRate.isPresent();
    }

    public boolean canReportUser(int reporterId, int reportedId) {
        Report.ReportId reportId = new Report.ReportId(reporterId, reportedId);
        Optional<Report> existingReport = reportRepository.findById(reportId);
        return !existingReport.isPresent();
    }

    @Transactional
    public boolean rateUser(User buyer, User owner, int rating) {
        if (canRateUser(buyer, owner)) {
            Rate rate = new Rate(buyer, owner, rating);
            rateRepository.save(rate);
            return true;
        }
        return false;
    }

    public User registerUser(User user) {
        return userRepository.save(user);
    }

    public User findById(int id) {
        return userRepository.findById(id); // Provjeri je li ovo ispravno postavljeno
    }
    

    /*public User findByOauthId(String oauthId) {
        return userRepository.findByOauthId(oauthId);
    }*/

    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    public User updateUser(User user) {
        return userRepository.save(user);
    }

    public void deleteUser(int id) {
        userRepository.deleteById((int) id);
    }

    public boolean emailExists(String email) {
        return userRepository.existsByEmail(email);
    }

    public int getId(String email) {
        return userRepository.findByEmail(email)
                .map(User::getId)  
                .orElseThrow(() -> new UsernameNotFoundException("User not found with email: " + email));  // If user is not found, throws an exception
    }
}

