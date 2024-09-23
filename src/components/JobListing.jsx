import React, {useContext} from 'react'
import AppContext from '../context/AppContext'
import JobCard from './JobCard';

const JobListing = () => {
    const {joblistings } = useContext(AppContext);
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {/* {joblistings.map((item)=> <p>{item.title}</p> )} */}
        {joblistings.map((job)=> <JobCard key={job.id} job={job} />)}
    </div>
  )
}

export default JobListing