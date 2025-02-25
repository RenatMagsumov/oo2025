package ee.renat.kymnevoistlus.controller;


import ee.renat.kymnevoistlus.entity.Result;
import ee.renat.kymnevoistlus.repository.ResultRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.ResponseEntity;

import java.util.List;

@RestController
@RequestMapping("/results")
public class ResultController
{
    @Autowired
    private final ResultRepository resultRepository;

    public ResultController(ResultRepository resultRepository) {
        this.resultRepository = resultRepository;
    }

    @GetMapping
    public List<Result> getAllResults()
    {
        return resultRepository.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Result> getResultById(@PathVariable Long id)
    {
        return resultRepository.findById(id).map(ResponseEntity::ok).orElseThrow(() -> new RuntimeException("ID_NOT_FOUND"));
    }

    @PostMapping
    public ResponseEntity<Result> createResult(@RequestBody Result result)
    {
        if (result.getScore() < 0)
        {
            throw new RuntimeException("SCORE_CANNOT_BE_NEGATIVE");
        }
        return ResponseEntity.ok(resultRepository.save(result));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteResult(@PathVariable Long id)
    {
        if (!resultRepository.existsById(id))
        {
            throw new RuntimeException("RESULT_NOT_FOUND");
        }
        resultRepository.deleteById(id);
        return ResponseEntity.ok("RESULT_DELETED");
    }


}
