package com.courses.backend.repository;

import com.courses.backend.model.result.Result;
import com.courses.backend.model.subscription.CourseUserId;
import com.courses.backend.model.subscription.Subscription;
import com.courses.backend.model.user.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface SubscriptionRepository extends JpaRepository<Subscription, CourseUserId> {

}
