import React from 'react'
import {Helmet} from 'react-helmet'
import {SITE_TITLE, SITE_DESCRIPTION, SITE_KEYWORDS} from '../constants/systemConstants'

const Meta = ({title, description, keywords}) => {
	return (
		<Helmet>
			<title>{title}</title>
			<meta name='description' content={description} />
			<meta name='keyword' content={keywords} />
		</Helmet>
	)
}

Meta.defaultProps = {
	title: `Welcome To ${SITE_TITLE}`,
	description: `${SITE_DESCRIPTION}`,
	keywords: `${SITE_KEYWORDS}`,
}

export default Meta
