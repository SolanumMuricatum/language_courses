package com.courses.backend.service.subscription;

import com.courses.backend.model.subscription.CourseUserId;
import com.courses.backend.model.subscription.Subscription;

public interface SubscriptionService {
    public void deleteSubscription(CourseUserId courseUserId);
    public void saveSubscription(Subscription subscription);
}
