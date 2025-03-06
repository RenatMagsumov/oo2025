package ee.renat.kymnevoistlus.controller;

import ee.renat.kymnevoistlus.repository.AthleteRepository;
import ee.renat.kymnevoistlus.entity.Athlete;
import ee.renat.kymnevoistlus.entity.Result;
import ee.renat.kymnevoistlus.repository.ResultRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Date;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/athletes")
public class AthleteController
{
    @Autowired
    private AthleteRepository athleteRepository;

    @Autowired
    private ResultRepository resultRepository;

    @GetMapping
    public List<Athlete> getAllAthletes()
    {
        return athleteRepository.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Athlete> getAthleteById(@PathVariable Long id)//vastuseks tuleb Athlete. Mis athlete? votame ID URL lingist(@PathVariable Long id))
    {
        return ResponseEntity.of(athleteRepository.findById(id));
    }

    @PostMapping
    public ResponseEntity<Athlete> createAthlete(@RequestBody Athlete athlete) //@RequestBody - kusib POSTMAN'ist body't ja salvestab(save) neid nagu uus ATHLETE
    {
        //kui POST'is ei ole lisatud field "name", anname veateade. kui on lisatud negatiivne vanus, veateade. kui valtime neid vigu, save'ime koik andmed Athlete'sse
        if (athlete.getName()==null)
        {
            throw new RuntimeException("PLEASE_ADD_NAME");
        }
        if (athlete.getAge() < 0) {
            throw new RuntimeException("AGE_CANNOT_BE_NEGATIVE");
        }
        return ResponseEntity.ok(athleteRepository.save(athlete)); //ResponseEntity.ok tahendab et koik laks hasti, tootab korrektselt/athleteRepository.save(athlete) salvestab athlete andmebaasi
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

    @GetMapping("/{id}/TotalScore")
    public ResponseEntity<Double> getAthleteTotalScore(@PathVariable Long id)
    {
        List<Result> results = resultRepository.findByAthleteId(id); // otsib koik results selle ID'ga ja hoiab neid uues lists results
        double totalScore = 0; //paneme et totalscore vaartus on 0 (aluseks)
        for (Result result : results) //vaatame koik Result listist results
        {
            totalScore = totalScore + result.getScore();
        }
        return ResponseEntity.ok(totalScore); //vastus
    }

    @GetMapping("/AthletesWithScores")
    public ResponseEntity<List<String>> getAthletesWithScores()
    {
         //kusib koik athletes andmebaasist ning tulemust salvestatakse listis Athlete nagu athlete(athletina)
        List<Athlete> athletes = athleteRepository.findAll();
        List<String> athleteScores = new ArrayList<>();
        //teeme uus list athleteScores ning lisame siia Scores.  iga element on nuud athlete + tema results
        for (Athlete athlete : athletes)
        {
            athleteScores.add(formatAthleteScore(athlete));
        }
                                    /*
                         for (int i = 0; i < athletes.size(); i++)
                         {
                        athleteScores.add(formatAthleteScore(athletes.get(i)));
                          }
                                */
        return ResponseEntity.ok(athleteScores);
        // Listist athletes teeme listi athleteScores(nimi + punktid)


    }

    //see plokk votab uuest listist(athlete+score) athleti koik score'd ja summerib neid ning tagastatakse juba athlete ja tema totalsum
    private String formatAthleteScore(Athlete athlete)
    {
        List<Result> results = resultRepository.findByAthleteId(athlete.getId());
        double totalScore = 0;
        //listist results me otsime Result andmeid, tapselt iga result
        for (Result result : results) // Result - class(entity). result - iga result. results - list
        {

            totalScore = totalScore + result.getScore();
        }
        return athlete.getName() + " " + totalScore;
    }

}
