package progi_project.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import progi_project.model.Deaktivira;
import progi_project.repository.DeaktiviraRepository;

import java.util.List;

@Service
public class DeaktiviraService {

    @Autowired
    private DeaktiviraRepository deaktiviraRepository;


    @Transactional
    public void createDeaktivira(int deaktiviraIdKor, int deaktiviranIdKor) {
        Deaktivira deaktivira = new Deaktivira();
        deaktivira.setDeaktiviraIdKor(deaktiviraIdKor);
        deaktivira.setDeaktiviranIdKor(deaktiviranIdKor);

        deaktiviraRepository.save(deaktivira);
    }


    public List<Deaktivira> getDeactivationsForUser(int deaktiviranIdKor) {
        return deaktiviraRepository.findAllByDeaktiviranIdKor(deaktiviranIdKor);
    }

    public boolean isUserDeactivated(int userId) {
        return deaktiviraRepository.existsByDeaktiviranIdKor(userId);
    }

    public List<Deaktivira> getDeactivationsByUser(int deaktiviraIdKor) {
        return deaktiviraRepository.findAllByDeaktiviraIdKor(deaktiviraIdKor);
    }
}
