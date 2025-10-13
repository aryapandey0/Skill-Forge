package com.skillforge.exception;

import org.springframework.http.*;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.web.bind.annotation.*;

@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(AccessDeniedException.class)
    public ResponseEntity<String> handleAccessDenied(AccessDeniedException ex) {
        return ResponseEntity
                .status(HttpStatus.FORBIDDEN)
                .body("You can't access this resource. You are not an INSTRUCTOR.");
    }

    // Optional: handle other exceptions
    @ExceptionHandler(Exception.class)
    public ResponseEntity<String> handleException(Exception ex) {
        return ResponseEntity
                .status(HttpStatus.BAD_REQUEST)
                .body(ex.getMessage());
    }
}
