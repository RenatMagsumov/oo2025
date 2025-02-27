package ee.renat.kymnevoistlus.exception;


import lombok.Data;
import java.util.Date;

@Data
public class ErrorMessage {
    private String message; // klass - null
    private Date timestamp; // klass - null
    private int status; // int - 0, double - 0.0
} // boolean - false
