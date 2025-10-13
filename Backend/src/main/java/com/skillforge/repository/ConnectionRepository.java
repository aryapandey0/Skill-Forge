package com.skillforge.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.skillforge.model.ConnectionStatus;
import com.skillforge.model.Connections;
public interface ConnectionRepository extends JpaRepository<Connections, Long>{
	Optional<Connections> findBySenderIdAndReceiverId(Long senderId, Long receiverId);

	List<Connections> findByReceiverIdAndStatus(long userId, ConnectionStatus status);
	List<Connections> findBySenderIdOrReceiverIdAndStatus(long senderId, long receiverId, ConnectionStatus status);
List<Connections> findBySenderIdAndStatus(long senderId,ConnectionStatus status);


}
