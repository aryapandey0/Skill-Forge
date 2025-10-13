 
package com.skillforge.service;

import java.util.Random;

import javax.crypto.Mac;
import javax.crypto.spec.SecretKeySpec;

import org.json.JSONObject;
import org.springframework.stereotype.Service;

import com.razorpay.Order;
import com.razorpay.RazorpayClient;

@Service
public class PaymentService {

    private final String KEY = "rzp_test_R8o5ZlgND8jf8k";   // ⚠️ apna Razorpay Key ID daal
    private final String SECRET = "qMCkfYuC8A7qDpjJexKzHoaC";         // ⚠️ apna Razorpay Secret daal

    private RazorpayClient client;

    public PaymentService() throws Exception {
        this.client = new RazorpayClient(KEY, SECRET);
    }

    // ✅ Create order
    public String createOrder(int amount) throws Exception {
        JSONObject options = new JSONObject();
        options.put("amount", amount * 100); // paise me
        options.put("currency", "INR");
        options.put("receipt", "txn_" + new Random().nextInt(100000));

        Order order = client.orders.create(options);
        return order.toString();
    }

    // ✅ Verify signature
    public boolean verifySignature(String orderId, String paymentId, String signature) throws Exception {
        String payload = orderId + "|" + paymentId;
        String actualSignature = hmacSHA256(payload, SECRET);
        return actualSignature.equals(signature);
    }

    // ✅ Convert HMAC to HEX string (not Base64)
    private String hmacSHA256(String data, String secret) throws Exception {
        SecretKeySpec keySpec = new SecretKeySpec(secret.getBytes(), "HmacSHA256");
        Mac mac = Mac.getInstance("HmacSHA256");
        mac.init(keySpec);
        byte[] rawHmac = mac.doFinal(data.getBytes());

        StringBuilder sb = new StringBuilder();
        for (byte b : rawHmac) {
            sb.append(String.format("%02x", b));
        }
        return sb.toString();
    }
}
