package com.courses.backend.service.result;

import com.courses.backend.model.result.Result;
import com.courses.backend.repository.ResultRepository;
import com.courses.backend.repository.TaskRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ResultServiceImpl implements ResultService{

    private final ResultRepository resultRepository;

    @Autowired
    public ResultServiceImpl(ResultRepository resultRepository) {
        this.resultRepository = resultRepository;
    }
    @Override
    public List<Result> findResultById(Integer answerId) {
        return resultRepository.findResultsByAnswerId(answerId);
    }
}
