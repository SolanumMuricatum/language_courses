package com.courses.backend.service.subscription;

import com.courses.backend.model.subscription.CourseUserId;
import com.courses.backend.model.subscription.Subscription;
import com.courses.backend.repository.RatingRepository;
import com.courses.backend.repository.SubscriptionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class SubscriptionServiceImpl implements SubscriptionService{
    private final SubscriptionRepository subscriptionRepository;

    @Autowired
    public SubscriptionServiceImpl (SubscriptionRepository subscriptionRepository){
        this.subscriptionRepository = subscriptionRepository;
    }

    @Override
    public void deleteSubscription(CourseUserId courseUserId) {
        subscriptionRepository.deleteById(courseUserId);
    }

    @Override
    public void saveSubscription(Subscription subscription) {
        subscriptionRepository.save(subscription);
    }
}