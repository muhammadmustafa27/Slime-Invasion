﻿using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.AI;

public class NavigationBeaker : MonoBehaviour {

	public NavMeshSurface[] surfaces;

	// Use this for initialization
	void Start () {
		for(int i = 0; i< surfaces.Length; i++){
			surfaces[i].BuildNavMesh();



		}
	}
}
