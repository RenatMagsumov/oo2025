package ee.renat.libisevKeskmine.Entity;


import jakarta.persistence.*;
import lombok.*;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class NumberEntity
{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private int value;
    //postmanis kui teeme POST paringu, tekkib uus objekt millel on olemas ID ja VALUE(meie juhul number - INT)
}