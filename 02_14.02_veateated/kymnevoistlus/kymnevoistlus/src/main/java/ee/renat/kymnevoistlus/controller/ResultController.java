package ee.renat.kymnevoistlus.controller;


import ee.renat.kymnevoistlus.entity.Result;
import ee.renat.kymnevoistlus.repository.ResultRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/results")
public class ResultController
{
    @Autowired
    private ResultRepository repository;

    @PostMapping
    public Result createResult(@RequestBody Result result)
    {
        return repository.save(result);
    }

    @GetMapping
    public List<Result> getAllResults()
    {
        return repository.findAll();
    }
}
