package com.skillforge.controller;

import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.skillforge.service.PaymentService;

@RestController

public class PaymentController {

    private final PaymentService paymentService;

    public PaymentController(PaymentService paymentService) {
        this.paymentService = paymentService;
    }

    @GetMapping("/create-order")
    public String createOrder(@RequestParam int amount) throws Exception {
        return paymentService.createOrder(amount);
    }

    @PostMapping("/verify")
    public ResponseEntity<String> verifyPayment(@RequestBody Map<String, String> data) {
        try {
            String orderId = data.get("orderId");
            String paymentId = data.get("paymentId");
            String signature = data.get("signature");

            boolean verified = paymentService.verifySignature(orderId, paymentId, signature);

            if (verified) {
                return ResponseEntity.ok("✅ Payment verified successfully!");
            } else {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                        .body("❌ Payment verification failed!");
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Error: " + e.getMessage());
        }
    }
}
