package ee.renat.kymnevoistlus.controller;

import ee.renat.kymnevoistlus.repository.AthleteRepository;
import ee.renat.kymnevoistlus.entity.Athlete;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/athletes")
public class AthleteController
{
    @Autowired
    private AthleteRepository repository;

    @PostMapping
    public Athlete createAthlete(@RequestBody Athlete athlete)
    {
        return repository.save(athlete);
    }

    @GetMapping
    public List<Athlete> getAllAthletes()
    {
        return repository.findAll();
    }


}
