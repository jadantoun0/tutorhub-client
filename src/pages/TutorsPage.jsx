import React, {useMemo, useState } from 'react'
import TutorBox from '../components/tutors/TutorBox'
import FilterTextField from '../components/tutors/FilterTextField';
import FilterPriceRange from '../components/tutors/FilterPriceRange';
import FilterSessionType from '../components/tutors/FilterSessionType';
import TutorSearchBar from '../components/tutors/TutorSearchBar';
import { SessionTypeOptions } from '../utils/userDataEnumUtils';
import { useLocation } from 'react-router-dom';
import CustomLoadingSpinner from '../components/common/CustomLoadingSpinner';
import { useGetAllTutorsQuery } from '../redux/services/tutorsSlice';

const sessionTypeOptions = [
    {value: SessionTypeOptions.REMOTE, label: 'Remote'},
    {value: SessionTypeOptions.IN_PERSON, label: 'In Person'},
]


const TutorsPage = () => {
    // useLocation hook retrieves the current URL and its parameters
    const { search } = useLocation();
    // Parse the search string to get the query parameters
    const params = new URLSearchParams(search);
    // Get the value of the 'editMode' parameter, default to false
    const requestedSubject = params.get('subject');

    const {data, isLoading, error} = useGetAllTutorsQuery();
    const tutors = data?.data;

    const [sessionTypeFilter, setSessionTypeFilter] = useState('any');
    const [priceRangeFilter, setPriceRangeFilter] = useState({ min: 0, max: 500 });
    const [languagesFilter, setLanguagesFilter] = useState('any')
    const [subjectFilter, setSubjectFilter] = useState(requestedSubject || "any")
    const [skillsFilter, setSkillsFilter] = useState("any")
    const [searchKeyword, setSearchKeyword] = useState("")


    // languages options is dependent on tutors object, so it should only change when the tutor 
    // object changes, so we use a useMemo hook that caches data
    const languagesOptions = useMemo(() => {
        const allLanguages = tutors?.reduce((languages, tutor) => {
          if (tutor.languages && !languages.includes(tutor.languages)) {
            languages.push(tutor.languages);
          }
          return languages;
        }, []);
        return allLanguages;
    }, [tutors]);


    // subject options is dependent on tutors object, so it should only change when the tutor 
    // object changes, so we use a useMemo hook that caches data
    const subjectOptions = useMemo(() => {
        const allSubjects = tutors?.reduce((subjects, tutor) => {
          if (tutor.subject && !subjects.includes(tutor.subject)) {
            subjects.push(tutor.subject);
          }
          return subjects;
        }, []);
        return allSubjects;
    }, [tutors]);
    

    // skills options is dependent on tutors object, so it should only change when the tutor 
    // object changes, so we use a useMemo hook that caches data
    const skillsOptions = useMemo(() => {
        const allSkills = tutors?.reduce((skills, tutor) => {
            tutor.skills.forEach((skill) => {
                if (skill && !skills.includes(skill)) {
                    skills.push(skill);
                }
            });
            return skills;
        }, []);
        // Sort the skills alphabetically (since the number of skills is huge)
        const sortedSkills = allSkills?.sort((a, b) => a.localeCompare(b));
        return sortedSkills;

    }, [tutors]);
    

    // function to filter the tutors based on user input
    const filteredTutors = useMemo(() => {
        return tutors?.filter((tutor) => {
          const matchesSkills = skillsFilter === 'any' || tutor.skills.includes(skillsFilter);
          const matchesLanguages = languagesFilter === 'any' || tutor.languages === languagesFilter;
          const matchesSessionType = sessionTypeFilter === 'any' || tutor.sessionType === sessionTypeFilter;
          const matchSearchKeyword = searchKeyword === '' || 
            tutor.firstName.toLowerCase().includes(searchKeyword) || tutor.lastName.toLowerCase().includes(searchKeyword)
          const matchesPriceRange = 
            tutor.hourlyRate >= priceRangeFilter.min && tutor.hourlyRate <= priceRangeFilter.max;
          const matchesSubject = subjectFilter === 'any' || tutor.subject === subjectFilter
            // Combine all filter conditions      
          return matchesSubject && matchesSkills && matchesSessionType && matchesLanguages  && matchesPriceRange && matchSearchKeyword;
        });
    }, [tutors, subjectFilter, searchKeyword, skillsFilter, priceRangeFilter, languagesFilter, sessionTypeFilter]);
    

    if (isLoading) 
        return <CustomLoadingSpinner/>
    if (error) 
        return <p className='text-center'>An unknown error occured</p>

    return (
        <section className='flex mx-auto max-w-6xl'>

            <aside className='w-1/4 flex flex-col gap-y-7'>
                <p className='font-bold text-lg'>Filters</p>
                <FilterTextField 
                    title='Filter by subjects'
                    value={subjectFilter} 
                    setValue={setSubjectFilter} 
                    options={subjectOptions}
                />
                <FilterTextField 
                    title='Filter by skills'
                    value={skillsFilter} 
                    setValue={setSkillsFilter} 
                    options={skillsOptions}/>
                <FilterTextField 
                    title='Filter by languages' 
                    value={languagesFilter} 
                    setValue={setLanguagesFilter} 
                    options={languagesOptions}/>
                <FilterSessionType 
                    value={sessionTypeFilter} 
                    setValue={setSessionTypeFilter}
                    options={sessionTypeOptions} />
                <FilterPriceRange 
                    value={priceRangeFilter} 
                    setValue={setPriceRangeFilter}
                />
            </aside> 

            <main className='flex flex-col gap-y-5'>

                <TutorSearchBar value={searchKeyword} setValue={setSearchKeyword} />

                <p className='font-bold text-xl'>
                    {filteredTutors.length} {filteredTutors.length === 1 ? 
                    <span>result</span> : <span>results</span>}
                </p>
                {
                    filteredTutors.length === 0 ?
                        <p className=''>No results to display</p> :
                        <article className='flex flex-col gap-y-5'>
                            {filteredTutors.map((tutor, index) => 
                                <TutorBox key={index} tutor={tutor}/>)}
                        </article>
                } 

            </main>
        </section>
    )
}

export default TutorsPage