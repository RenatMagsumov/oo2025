package ee.renat.kymnevoistlus.controller;


import ee.renat.kymnevoistlus.entity.Athlete;
import ee.renat.kymnevoistlus.entity.Result;
import ee.renat.kymnevoistlus.repository.AthleteRepository;
import ee.renat.kymnevoistlus.repository.ResultRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.ResponseEntity;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/results")
public class ResultController
{
    @Autowired
    private ResultRepository resultRepository; //connect'ime et tegeleda resultiga(save/findAll/findById/...)

    @Autowired
    private AthleteRepository athleteRepository; //connect'ime et tegeleda konkreetse sportlase resultiga(FindById(AthleteId)). muidu ei saa leida kas athlete selle id eksisteerib? seotada result ja athlete


    //annab koik resultid mis on andmebaasis olemas
    @GetMapping
    public List<Result> getAllResults()
    {
        return resultRepository.findAll();
    }

    //annab konkreetne resilt(Id)/kui ei eksisteeri - veateade
    @GetMapping("/{id}")
    public ResponseEntity<Result> getResultById(@PathVariable Long id) //<Result> sest see plokk tagastab result'i(kui koik on kooras)
    {
        return resultRepository.findById(id).map(ResponseEntity::ok).orElseThrow(() -> new RuntimeException("ID_NOT_FOUND"));
        //.map(ResponseEntity::ok) kui Id on leitud, annab teada et koik on korras(id eksisteeriv)
    }

    @PostMapping
    public ResponseEntity<Result> addResult(@RequestBody Result result) //<Result> sest see plokk tagastab result'i(kui koik on korras)
    {
        if (result.getAthlete() == null || result.getAthlete().getId() == null)
        {
            //kui proovitakse lisada result kuid ei ole pandnud mis ID'le see result laheb, tuleb see veateade
            throw new RuntimeException("PLEASE_ADD_ID");
        }

        Optional<Athlete> athlete = athleteRepository.findById(result.getAthlete().getId());
        if (athlete.isEmpty())
        {
            //kui Id on antud kuid andmebaasis sellist ID't ei ole, tuleb see veateda
            throw new RuntimeException("ATHLETE_NOT_FOUND");
        }

        result.setAthlete(athlete.get()); //seotame resulti athlete-ga
        return ResponseEntity.ok(resultRepository.save(result));
    }

    @DeleteMapping("/{id}") //@pathvariable votab andmet URL-lingist, LONG IG - mida on vaja votta
    public ResponseEntity<String> deleteResult(@PathVariable Long id) // response<string> sest see plokk tagastab teksti(kui koik on korras)(siin molemad tulemused tagastavad teksti)
    {
        if (!resultRepository.existsById(id)) //kui Id ei leitud, tuleb veateade
        {
            throw new RuntimeException("RESULT_NOT_FOUND");
        }
        //kui koik on korras - delete
        resultRepository.deleteById(id);
        return ResponseEntity.ok("RESULT_DELETED");
        // selline jarjekord et valtida lisatood - kui kohe on arusaadav et ID't ei ole - teade ja koik. kui eksisteerib, siis edasi voib olla mittu sammu(meil ainult 1 samm)
    }


}
