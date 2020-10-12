import React, { useState } from 'react';
import axios from 'axios';
import config from '../../temp/config';

const PlanWholePage = ({ fields }) => {
	const [queryResult, setQueryResult] = useState({});
	axios.post(config.sitecoreApiHost + "/services/rest/api.svc/graphql",{
	  query: `
  query planQuery($comnum: String!, $plannum: String!) { 
	similarCommunities (comnum: $comnum) { 
		name
		image
		url
	}
	recentlyViewed (comnum: $comnum) { 
		name
		image
		url
	}
	plan (comnum: $comnum, plannum: $plannum) { 
		name 
		image
		isFavorite
		smallText
		homeSize 
		beds
		baths
		price
		overview
		elevationImages {
			image
			price
			text
		}
		community {
			name
			image
			url
			inhcInfo
			amenityImages {
				image
				text
			}
		}
	}
}`,
		variables: {
			comnum: fields.comnum,
			plannum: fields.plannum
		}
	  },
	  {
		headers: {
			'Content-Type': 'application/octet-stream'
		}
	  }).then((result) => {
		  setQueryResult(result.data);
	  });
	return (
  <React.Fragment>
  <h1>PlanWholePage</h1>
  Input Data: {JSON.stringify(fields)}
  <br/>
  Query Result: 
  <span style={{fontSize:"10px"}}>
	{JSON.stringify(queryResult)}
  </span>
  </React.Fragment>
  );
};

export default PlanWholePage;