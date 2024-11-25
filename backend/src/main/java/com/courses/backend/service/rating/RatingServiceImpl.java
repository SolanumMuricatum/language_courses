package com.courses.backend.service.rating;

import com.courses.backend.model.rating.Rating;
import com.courses.backend.repository.ModuleRepository;
import com.courses.backend.repository.RatingRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.imageio.spi.ServiceRegistry;

@Service
public class RatingServiceImpl implements RatingService{

    private final RatingRepository ratingRepository;

    @Autowired
    public RatingServiceImpl (RatingRepository ratingRepository){
        this.ratingRepository = ratingRepository;
    }

    @Override
    public void addCourseRating(Rating rating) {
        ratingRepository.save(rating);
    }
}
