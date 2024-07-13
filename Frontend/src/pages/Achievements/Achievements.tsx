import React from 'react'
import './Achievements.css'
import { Link } from 'react-router-dom'
import { Tooltip } from '@mui/material'
import Badge from '~/components/Badge/Badge'

const achievements = [
  {
    icon: 'volunteer_activism',
    description: 'Example Achievement Description',
    colors: {
      rim: '#FF9696',
      ribbon: ['#F84242', '#F23737'],
      gradient: ['#FF6161', '#FAEDED'],
    },
  },
  {
    icon: '1k',
    description: 'Example Achievement Description 2',
    colors: {
      rim: '#96FF96',
      ribbon: ['#42F842', '#37F237'],
      gradient: ['#61FF61', '#EDFAED'],
    },
  },
  {
    icon: '10k',
    description: 'Example Achievement Description 3',
    colors: {
      rim: '#9696FF',
      ribbon: ['#4242F8', '#3737F2'],
      gradient: ['#6161FF', '#EDEDFA'],
    },
  },
]

export default function Achievements() {
  return (
    <div className="achievements-page">
			<div className="title">Your Achievements</div>
      <div className="achievements-container">
        {achievements.map((a, i) => (
          <Tooltip title={a.description} key={i}>
            <Badge className="achievement" id={i.toString()} colors={a.colors}>
              <span className="material-symbols-outlined achievement-icon">{a.icon}</span>
            </Badge>
          </Tooltip>
        ))}
      </div>
      <Link to="/"> Go Home </Link>
    </div>
  )
}
