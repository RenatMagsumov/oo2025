package ee.renat.libisevKeskmine.Controller;


import ee.renat.libisevKeskmine.Entity.NumberEntity;
import ee.renat.libisevKeskmine.Repository.NumberRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.OptionalDouble;
import java.util.stream.Collectors;
import java.util.stream.IntStream;


@RestController
@RequestMapping("/numbers")
public class NumberController
{
    @Autowired
    private NumberRepository numberRepository;

    @PostMapping("/add")
    public NumberEntity addNumber(@RequestBody NumberEntity number)//Lisame NumberEntity'sse uus number, tema vaartuse otsime body's ning sealt leiame numbri
    {
        return numberRepository.save(number);//salvestame see number
    }

    @GetMapping("/all")
    public List<NumberEntity> getNumbers()//tahame saada listi koiki andmetega
    {
        return numberRepository.findAll();//trukime valja(tagastame) koik mis selles listis asub(koik numbrid)
    }

    @GetMapping("/sum")
    public int getSum()//tahame saada vastuseks numbri
    {
        List<NumberEntity> numbers = numberRepository.findAll();//otsime koik andmed mis on olemas ja teeme sellest list

        int sum = 0; //esialgu peab sum vaartus olema 0еще
        for (NumberEntity number : numbers) //meil on list numbers mille sees on numbrid(NumberEntity). iga NumberEntity nimetame "number"-iks
        {
            sum = sum + number.getValue(); //number.getValue() - igal numbril on oma vaartus, siin me votame numbrist tema vaartuse ja summerime
        }
        return sum;
    }

    @GetMapping("/average")
    public double getAverage  ()//double kuna keskmine voib ola 0.1(mitte taisarv) ning double annab rohkem numbreid peale komat kui FLOAT
    {
        List<NumberEntity> numbers = numberRepository.findAll();

        int sum = 0;
        for (NumberEntity number : numbers) //meil on list numbers mille sees on numbrid(NumberEntity). iga NumberEntity (objekt)nimetame "number"-iks
        {
            sum = sum + number.getValue(); //number.getValue() - igal numbril on oma vaartus, siin me votame numbrist tema vaartuse ja summerime
        }
        return (double) sum / numbers.size();// summa/numbrite arv listis
    }

    @GetMapping("/max")
    public int getMax()
    {
        List<NumberEntity> numbers = numberRepository.findAll();
        int max = numbers.get(0).getValue();//votame esimese numbri ja kohe paneme et ta on suurim (kuna ta on esimene selles listis)

        for (NumberEntity number : numbers)//hakkame koiki numbreid vaatama ja vordlema
        {
            if (number.getValue() > max)//kui number mis me hetkel kontrollime on suurem kui meie endine MAX, teeme teda uueks MAX-iks
            {
                max = number.getValue();
            }
        }
        return max;//trukitame max
    }

    @GetMapping("/libisevKeskmine")
    public List<Double> getLibisevKeskmine()
    {
        List<NumberEntity> entities = numberRepository.findAll(); // teeme uue listi objekte
        if (entities.size() < 3)
        {
            return List.of(); //kui objekte on vahem kui 3, tagastame tuhja listi
        }

        List<Integer> numbers = new ArrayList<>(); // teeme listi numbreid mis hoiab endas ainult numbreid(int)
        for (NumberEntity entity : entities)//vaatame koiki objekti listis entities
        {
            numbers.add(entity.getValue()); // saame entity'st numbri ning lisame ta listi
        }

        List<Double> libisevKeskmine = new ArrayList<>();//uus list mis hoiab ainult seda "Libisev keskmine" ehk siis kalkulaatori vastuseid
        for (int i = 0; i < numbers.size() - 2; i++)//vaatame terve listi esimesest objektist kuni viimaseni-2 (nii tootab see libisev keskmine)
        {
            double avg = (numbers.get(i) + numbers.get(i + 1) + numbers.get(i + 2)) / 3.0; // siin votame esimene,teine,kolmas vaartus, summerime neid ja teeme devide by 3
            libisevKeskmine.add(avg);//lisame tulemuse listi
        }
        return libisevKeskmine;
    }

}
