package com.skillforge.controller;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.skillforge.model.ConnectionStatus;
import com.skillforge.model.Connections;
import com.skillforge.model.User;
import com.skillforge.repository.ConnectionRepository;
import com.skillforge.repository.UserRepository;

@RestController
@RequestMapping("api/connection")
public class ConnectionController {
	
	@Autowired
	ConnectionRepository repo;
	
	@Autowired
	UserRepository urepo;
	
	// ✅ Check connection status
	@GetMapping("/check/{userId}/{otherUserId}")
	public boolean isConnected(@PathVariable long userId ,@PathVariable long otherUserId) {
		
		return repo.findBySenderIdAndReceiverId(userId, otherUserId).isPresent() ||
				repo.findBySenderIdAndReceiverId(otherUserId, userId).isPresent();
	}
	
	// ✅ Create new connection request
	@PostMapping("/{userId}/{otherUserId}")
	public Connections createConnection(@PathVariable long userId ,@PathVariable long otherUserId) {
		User sender = urepo.findById(userId)
				.orElseThrow(() -> new RuntimeException("Sender not found"));
		User receiver = urepo.findById(otherUserId)
				.orElseThrow(() -> new RuntimeException("Receiver not found"));
		
		Connections c = new Connections();
		c.setSender(sender);
		c.setCreatedAt(LocalDateTime.now());
		c.setReceiver(receiver);
		c.setStatus(ConnectionStatus.REQUESTED);
		
		return repo.save(c);
	}
	

	@GetMapping("/all/{userId}")
	public List<Connections> getAllConnections(@PathVariable long userId){
		return repo.findBySenderIdOrReceiverIdAndStatus(userId, userId, ConnectionStatus.ACCEPTED);
	}

	// ✅ Get all pending requests for a user
	@GetMapping("/requests/{userId}")
	public List<Connections> getAllRequests(@PathVariable long userId){
		return repo.findByReceiverIdAndStatus(userId, ConnectionStatus.REQUESTED);
	}
	@GetMapping("/status/{senderId}/{receiverId}")
	public String getStatus(@PathVariable long senderId , @PathVariable long receiverId) {
		return repo.findBySenderIdAndReceiverId(senderId, receiverId)
				.or(()->repo.findBySenderIdAndReceiverId(receiverId, senderId))
				.map(conn->{
					if(conn.getStatus()==ConnectionStatus.REQUESTED) {
						if(conn.getSender().getId() == senderId) {
							return "REQUESTED_BY_ME";
						}else {
							return "REQUESTED_TO_ME";
						}
					}
					if (conn.getStatus() == ConnectionStatus.ACCEPTED) {
	                    return "CONNECTED";
	                }
					 return conn.getStatus().toString();
				})
				.orElse("NOT_CONNECTED");
	}
	@PostMapping("/accept/{connectionId}")
	public Connections acceptRequest(@PathVariable long connectionId) {
	    Connections c = repo.findById(connectionId)
	        .orElseThrow(() -> new RuntimeException("Connection not found"));

	    c.setStatus(ConnectionStatus.ACCEPTED);
	    return repo.save(c);
	}

	@DeleteMapping("/reject/{connectionId}")
	public void rejectRequest(@PathVariable long connectionId) {
	    repo.deleteById(connectionId);
	}

	@GetMapping("/mine/{senderId}/{receiverId}")
	public List<Connections> getMyConnections(@PathVariable long senderId,@PathVariable long receiverId){
		return repo.findBySenderIdOrReceiverIdAndStatus(senderId, receiverId, ConnectionStatus.ACCEPTED);
	}
	
}
