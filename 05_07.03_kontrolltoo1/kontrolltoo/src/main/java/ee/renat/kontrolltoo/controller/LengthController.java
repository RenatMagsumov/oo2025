package ee.renat.kontrolltoo.controller;


import ee.renat.kontrolltoo.entity.QueryRecord;
import ee.renat.kontrolltoo.repository.LengthRepository;
import ee.renat.kontrolltoo.entity.Length;
import ee.renat.kontrolltoo.repository.QueryRecordRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/words")
public class LengthController
{
    @Autowired
    private LengthRepository lengthRepository;

    @Autowired
    private QueryRecordRepository queryRecordRepository;

    @PostMapping("/add")
    public Length addWord(@RequestBody Length word)
    {
        if (word.getWord() == null || word.getWord().isEmpty())
        {
            throw new RuntimeException("WORD_CANNOT_BE_EMPTY");
        }
        if(word.getWord().contains(" "))
        {
            throw new RuntimeException("WORD_CANNOT_CONTAIN_SPACES");
        }
        return lengthRepository.save(word);
    }

    @GetMapping("/all")
    public List<Length> getAllWords()
    {
        return lengthRepository.findAll();
    }

    @GetMapping("/countThree") // sona pikkus = 3
    public long countThreeLetterWords()
    {
        List<Length> words = lengthRepository.findAll();
        int count = 0;
        for (Length word : words)
        {
            if (word.getWord().length() == 3)
            {
                count++;
            }
        }

        queryRecordRepository.save(new QueryRecord(null, count)); // salvestame tulemus uues tabelis
        return count;
    }

    @GetMapping("/countMultipleThree")
    public long countWordsMultipleOfThree() // kui jaak on 0 siis laheb arvesse
    {
        List<Length> words = lengthRepository.findAll();
        int count = 0;
        for (Length word : words)
        {
            if (word.getWord().length() % 3 == 0)
            {
                count++;
            }
        }
        return count;
    }

    @GetMapping("/algarv/{word}")
    public boolean isWordAlgarv(@PathVariable String word) //jagub ainult 1- ja iseendaga.
    {
        int length = word.length();
        if (length < 2) return false; // numbril 1 on ainult 1 jagaja(tema ise)
        for (int i = 2; i * i <= length; i++) // kontrollitakse nii kaua kuni i*i (tulemus) on vaiksem kui sona pikkus(length)
        {
            if (length % i == 0)//votame selle numbri ja jagame, kui jaak = 0 siis ja jagub selle numbriga. ehk meile see ei sobi
            {
                return false;
            }
        }
        return true;
    }

    @GetMapping("/modifiedWords")
    public List<String> modifiedWords()
    {
        List<Length> words = lengthRepository.findAll(); // saame koik sonad andmebaasist
        List<String> modifiedWords = new ArrayList<>(); //uus list kus on uued sonad lisatud prefix-iga
        for (Length word : words)
        {
            // lisame korduvaid sumboleid
            String result = ""; // teeme uuse stringi, kuhu paneme selle prefix'i(sumboli)
            for (int i = 0; i < word.getWord().length(); i++)
            {
                result = result + word.getWord().charAt(0); //votame esimese sumboli ja kordame seda nii mitu korda kui sõna pikkus
            }
            // lisame sumbol algusesse ka
            modifiedWords.add(result + word.getWord());
        }
        return modifiedWords;
    }
}
