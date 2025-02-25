package ee.renat.kymnevoistlus.controller;

import ee.renat.kymnevoistlus.repository.AthleteRepository;
import ee.renat.kymnevoistlus.entity.Athlete;
import org.apache.coyote.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/athletes")
public class AthleteController
{
    @Autowired
    private AthleteRepository repository;

    private final AthleteRepository athleteRepository;

    public AthleteController(AthleteRepository athleteRepository)
    {
        this.athleteRepository=athleteRepository;
    }

    @GetMapping
    public List<Athlete> getAllAthletes()
    {
        return repository.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Athlete> getAthleteById(@PathVariable Long id)
    {
        return athleteRepository.findById(id).map(ResponseEntity::ok).orElseThrow(() -> new RuntimeException("ID_NOT_FOUND"));
    }

    @PostMapping
    public ResponseEntity<Athlete> createAthlete(@RequestBody Athlete athlete)
    {
        if (athlete.getName()==null)
        {
            throw new RuntimeException("NAME_CANNOT_BE_NULL");
        }
        if (athlete.getAge() < 0) {
            throw new RuntimeException("AGE_CANNOT_BE_NEGATIVE");
        }
        return ResponseEntity.ok(athleteRepository.save(athlete));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteAthlete(@PathVariable Long id)
    {
        if (!athleteRepository.existsById(id))
        {
            throw new RuntimeException("ID_NOT_FOUND");
        }
        athleteRepository.deleteById(id);
        return ResponseEntity.ok("ATHLETE_DELETED");
    }


}
