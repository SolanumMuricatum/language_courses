package com.courses.backend.service.result;

import com.courses.backend.model.result.Result;

import java.util.List;

public interface ResultService {
    public List<Result> findResultById(Integer answerId);
}
