package com.te.accademy.webapi.repo;

import java.util.Date;
import java.util.List;

import com.te.accademy.webapi.datamodel.view.CaseDetail;
import com.te.accademy.webapi.datamodel.view.CaseSummary;

public interface CaseSummaryCustomQuery {

	List<CaseSummary> findCaseSummaries(Date from, Date to, String country);

	List<CaseDetail> findCaseDetails(Date from, Date to, String country);
}
